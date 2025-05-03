import inquirer from 'inquirer'
import { getFragmentedTables, vacuumTables } from '../src/lib/vacuumRunner.js'
import Logger from '../src/core/Logger.js'
import config from '../src/config/config.js'

async function main() {
  Logger.info('Clean Dead Tuples: PostgreSQL')

  const { connectionString } = await inquirer.prompt([
    {
      type: 'input',
      name: 'connectionString',
      message: 'PostgreSQL connection string:',
      validate: (str) => str.startsWith('postgresql://') || 'Invalid connection string.',
    },
  ])

  // const config = {
  //   threshold: 20,  // % dead tuples
  //   minSizeBytes: 1024 * 8,  // 8 KB
  //   useFullVacuum: false,
  // }

  const fragmentedTables = await getFragmentedTables(connectionString, config)

  if (fragmentedTables.length === 0) {
    Logger.success('No table fragment found.')
    return
  }

  Logger.warn(`${fragmentedTables.length} fragmented tables found.`)

  const { showTables, useFullVacuum, confirmVacuum } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'showTables',
      message: 'Do you want to view the list of affected tables?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'useFullVacuum',
      message: 'Use FULL VACUUM (slower, but frees more space)?',
      default: config.useFullVacuum,
    },
    {
      type: 'confirm',
      name: 'confirmVacuum',
      message: 'Confirm execution of VACUUM?',
      default: true,
    },
  ])

  if (showTables) {
    console.table(
      fragmentedTables.map((t) => ({
        table: `${t.schema}.${t.table_name}`,
        dead: `${t.dead_tup_percentage.toFixed(2)}%`,
        sizeMB: `${(t.table_size_in_bytes / 1024 / 1024).toFixed(2)} MB`,
      }))
    )
  }

  if (!confirmVacuum) {
    Logger.warn('Execution cancelled by user.')
    return
  }

  config.useFullVacuum = useFullVacuum

  const start = performance.now()
  await vacuumTables(connectionString, fragmentedTables, config)
  const end = performance.now()

  Logger.success(`Completed in ${(end - start).toFixed(0)} ms`)
}

main().catch((err) => {
  Logger.error('Unexpected error: ' + err)
  process.exit(1)
})
