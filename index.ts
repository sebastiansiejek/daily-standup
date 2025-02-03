import {printDailyStandup} from "@src/services/printDailyStandup.js";

const main = async () => {
  await printDailyStandup()
}

await main();
