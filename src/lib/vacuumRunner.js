import VacuumEngine from '../core/VacuumEngine.js'
import TableAnalyzer from '../core/TableAnalyzer.js'

export async function getFragmentedTables(connectionString, config) {
  const vacuumEngine = new VacuumEngine(connectionString)
  await vacuumEngine.connect()

  try {
    const tableStats = await vacuumEngine.tableStats()
    return TableAnalyzer.analyze(tableStats, config)
  } finally {
    await vacuumEngine.disconnect()
  }
}

export async function vacuumTables(connectionString, tables, config) {
  const vacuumEngine = new VacuumEngine(connectionString)
  await vacuumEngine.connect()

  try {
    for (const table of tables) {
      try {
        console.log(`→ VACUUM ${table.schema}.${table.table_name}`)
        await vacuumEngine.vacuumTable(table, config)
      } catch (err) {
        console.error(`❌ Erro ao fazer vacuum na tabela ${table.schema}.${table.table_name}: ${err.message}`)
      }
    }
    
  }
  finally {
    await vacuumEngine.disconnect()
  }
}

