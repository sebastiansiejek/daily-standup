import {start} from "@src/commands/start";
import {resetConfig} from "@src/commands/config/resetConfig";
import {server} from "@src/server/server";

const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "config:reset":
      resetConfig();
      break;

    case "browser":
      server();
      break;

    default:
      await start();
      process.exit(1);
  }
}



await main();
