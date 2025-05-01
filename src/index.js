import inquirer from "inquirer";
import VacuumEngine from "./core/VacuumEngine.js";
import TableAnalyzer from "./core/TableAnalyzer.js";

async function main() {
  console.log(
    "═══════════════════════ Clean Dead Tuples: PostgreSQL ═══════════════════════"
  );

  const vacuumEngine = new VacuumEngine();
  await vacuumEngine.connect();

  try {
    const config = vacuumEngine.initialConfig();
    const tableStats = await vacuumEngine.tableStats();
    const fragmentedTables = TableAnalyzer.analyze(tableStats, config);

    if (fragmentedTables.length === 0) {
      console.log("✅ No table fragment found.");
      return;
    }

    console.log(`⚠ ${fragmentedTables.length} tables fragmented found.`);

    const { showTables, useFullVacuum, confirmVacuum } = await inquirer.prompt([
      {
        type: "confirm",
        name: "showTables",
        message: "Do you want to view the list of affected tables?",
        default: true,
      },
      {
        type: "confirm",
        name: "useFullVacuum",
        message:
          "Do you want to use FULL VACUUM (slower, but frees up more space)?",
        default: config.useFullVacuum ?? false,
      },
      {
        type: "confirm",
        name: "confirmVacuum",
        message: "Confirm execution of VACUUM on these tables?",
        default: true,
      },
    ]);

    if (showTables) {
      console.table(
        fragmentedTables.map((t) => ({
          table: `${t.schema}.${t.table_name}`,
          dead: `${t.dead_tup_percentage.toFixed(2)}%`,
          sizeMB: `${(t.table_size_in_bytes / 1024 / 1024).toFixed(2)} MB`,
        }))
      );
    }

    if (!confirmVacuum) {
      console.log("❌ Execution canceled by user.");
      return;
    }

    config.useFullVacuum = useFullVacuum;

    const start = performance.now();
    for (const table of fragmentedTables) {
      console.log(`→ VACUUM ${table.schema}.${table.table_name}`);
      await vacuumEngine.vacuumTable(table);
    }
    const end = performance.now();

    console.log(`✅ Finalized in ${(end - start).toFixed(0)} ms`);
  } catch (err) {
    console.error("❌ Error during execution:", err.message);
  } finally {
    await vacuumEngine.disconnect().catch((err) => {
      console.error("⚠ Error when disconnecting:", err.message);
    });
    console.log(
      "═══════════════════════ End of execution ═══════════════════════"
    );
  }
}

main().catch(() => process.exit(1));
