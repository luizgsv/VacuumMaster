class TableAnalyzer {
  static analyze(tables, config = { threshold: 20, minSizeBytes: 1048576, verbose: false }) {
    const dirtyTables = [];

    if (config.verbose) {
      console.log("Analyzing tables...");
    }

    for (const table of tables) {
      const { dead_tup_percentage: deadTupPercentage, table_size: tableSize, schemaname, relname } = table;
      const parsedTableSize = this._parseSizeToBytes(tableSize);

      if (deadTupPercentage > config.threshold && parsedTableSize >= config.minSizeBytes) {
        dirtyTables.push({
          schema: schemaname,
          table_name: relname,
          dead_tup_percentage: deadTupPercentage,
          table_size_in_bytes: parsedTableSize,
        });
      }

      if (config.verbose) {
        console.log(`Table: ${schemaname}.${relname}, Dead Tuples: ${deadTupPercentage}%, Size: ${parsedTableSize} bytes`);
      }
    }

    if (config.verbose) {
      console.log("Fragmented tables:", dirtyTables);
    }

    return dirtyTables;
  }

  static _parseSizeToBytes(sizeStr) {
    const units = { bytes: 1, kB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
    const [value, unit] = sizeStr.split(" ");

    if (typeof units[unit] === "undefined") {
      throw new Error(`Unknown size unit: ${unit}`);
    }

    return parseFloat(value) * units[unit];
  }
}

export default TableAnalyzer;
