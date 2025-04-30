class TableAnalyzer {
  static analyze(tables, config = { threshold: 20, minSizeBytes: 1048576 }) {
    const dirtyTables = []
    for (let i = 0; i < tables.length; i++) {
      if (tables[i].dead_tup_percentage > config.threshold && this._parseSizeToBytes(tables[i].table_size) >= config.minSizeBytes) {
        dirtyTables.push({ schema: tables[i].schemaname, table_name: tables[i].relname, dead_tup_percentage: tables[i].dead_tup_percentage, table_size_in_bytes: this._parseSizeToBytes(tables[i].table_size) })
      }
    }

    return dirtyTables
  }

  static _parseSizeToBytes(sizeStr) {
    const units = { kB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
    const [value, unit] = sizeStr.split(' ');
    if (typeof units[unit] === 'undefined') {
      return parseInt(value)
    }
    return parseInt(value) * units[unit];
  }
}

export default TableAnalyzer