import inquirer from 'inquirer';
import * as process from "node:process";
import {printDailyStandup} from "@src/services/printDailyStandup.js";
import {updateEnvFile} from "@src/shared/utils/updateEnvFile.js";

const main = async () => {
  if(
    !process.env.API_TIMECAMP_TOKEN ||
    !process.env.JIRA_TOKEN ||
    !process.env.JIRA_EMAIL ||
    !process.env.JIRA_DOMAIN
  ) {
    const inputs = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'API_TIMECAMP_TOKEN',
          message: 'Please enter timecamp api token:',
          required: true,
          default: process.env.API_TIMECAMP_TOKEN
        },
        {
          type: 'input',
          name: 'JIRA_TOKEN',
          message: 'Please enter Jira API token:',
          required: true,
          default: process.env.JIRA_TOKEN
        },
        {
          type: 'input',
          name: 'JIRA_DOMAIN',
          message: 'Please enter jira domain: ',
          required: true,
          default: process.env.JIRA_DOMAIN
        },
        {
          type: 'input',
          name: 'JIRA_EMAIL',
          message: 'Please enter jira email: ',
          required: true,
          default: process.env.JIRA_EMAIL
        }
      ])

    Object.entries(inputs).forEach(([key, value]) => {
      updateEnvFile(key, value);
    })
  }

  await printDailyStandup()
}

await main();
