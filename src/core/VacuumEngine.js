import { Client } from 'pg'
import config from '../config.js'

class VacuumEngine {
  constructor(dbConfig = config) {
    this.client = new Client({ connectionString: config.connectionString })
    this.configClient = dbConfig
  }

  async connect() {
    await this.client.connect()
  }

  async tableStats() {
    const query = `SELECT
      schemaname,
      relname,
      n_live_tup,
      n_dead_tup,
      (n_dead_tup::float / (n_live_tup + n_dead_tup + 1)) * 100 AS dead_tup_percentage,
      pg_size_pretty(pg_relation_size(relid)) AS table_size
    FROM
      pg_stat_user_tables
    WHERE
      n_dead_tup > 0
    ORDER BY
      n_dead_tup DESC;`

    const res = await this.client.query(query);
    return res.rows
  }

  async vacuumTable(table){
    const { useFullVacuum = false } = this.configClient
    try {
      if (!table?.schema || !table?.table_name) {
        throw new Error('missing schema or table_name');
      }
  
      const options = [
        useFullVacuum ? 'FULL' : null,
        'VERBOSE',
        'ANALYZE'
      ].filter(Boolean).join(', ');
  
      const queryText = `VACUUM (${options}) ${table.schema}.${table.table_name}`;
      await this.client.query(queryText);
    } catch (error) {
      console.log(`Failed to vacuum ${table.schema}.${table.table_name}:`, error.message);
      throw error;
    }
  }

  async disconnect() {
    await this.client.end()
  }

  initialConfig() {
    return {
      threshold: this.configClient.threshold,
      minSize: this.configClient.minSize,
      minSizeBytes: this.configClient.minSizeBytes,
      useFullVacuum: this.configClient.useFullVacuum
    }
  }
}

export default VacuumEngine