class TableAnalyzer {
  static analyze(tables, config = { threshold: 20, minSizeBytes: 1048576 }) {
    const dirtyTables = [];

    // Debug log: let´s see all the table and their statistics
    console.log("Analyzing tables...");

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const deadTupPercentage = table.dead_tup_percentage;
      const tableSize = this._parseSizeToBytes(table.table_size);

      // checking for dead tuples, even with a small percentage
      if (deadTupPercentage > 0 || tableSize >= config.minSizeBytes) {
        // allowing dead tuple with any percentage
        dirtyTables.push({
          schema: table.schemaname,
          table_name: table.relname,
          dead_tup_percentage: deadTupPercentage,
          table_size_in_bytes: tableSize,
        });
      }
    }

    // displaying which tables have were marked with fragments
    console.log("Fragmented tables:", dirtyTables);
    return dirtyTables;
  }

  static _parseSizeToBytes(sizeStr) {
    const units = { kB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
    const [value, unit] = sizeStr.split(" ");

    if (typeof units[unit] === "undefined") {
      return parseInt(value); // For cases where the unit is not recognized
    }

    return parseInt(value) * units[unit];
  }
}

export default TableAnalyzer;
