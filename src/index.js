
import VacuumEngine from './core/VacuumEngine.js'
import TableAnalyzer from './core/TableAnalyzer.js'

const vacuumEngine = new VacuumEngine()
vacuumEngine.connect()

async function main() {
  console.log('══════════════════════════Initializing clean dead Tuples══════════════════════════')
  try {
    if (!(vacuumEngine instanceof VacuumEngine)) {
      throw new Error('VacuumEngine instance is invalid!');
    }
    const initialConfig = vacuumEngine.initialConfig()
    const tableStats = await vacuumEngine.tableStats()
    const fragmentedTables = TableAnalyzer.analyze(tableStats, initialConfig)

    if (!(fragmentedTables.length > 0)) {
      console.log("✅ No fragmented tables found")
      console.log('══════════════════════════════════════════════════════════════════════════════════')
      return
    }

    console.log(`⚠ Total of ${fragmentedTables.length} fragmented tables found`)
    console.log(`----> useFullVacuum?`, initialConfig.useFullVacuum)
    const start = performance.now()
    for (let i = 0; i < fragmentedTables.length; i++) {
      console.log(`------> VACUUM`, fragmentedTables[i].table_name)
      await vacuumEngine.vacuumTable(fragmentedTables[i])
    }
    const end = performance.now()
    console.log(`------> finalized in ${end - start} ms`)
    console.log(`✅ All fragmented tables was fixed`)
  } catch (err) {
    console.log(err)
  }
}


main().catch(() => process.exit(1)).finally(() => vacuumEngine.disconnect().catch(err => {
  console.log('failed to disconnect:', err)
}))