import {start} from "@src/commands/start.js";
import {resetConfig} from "@src/commands/config/resetConfig.js";

const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "config:reset":
      resetConfig();
      break;

    default:
      await start();
      process.exit(1);
  }
}

await main();
