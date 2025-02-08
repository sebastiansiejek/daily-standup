import inquirer from 'inquirer';
import {printDailyStandup} from "@src/services/printDailyStandup.js";
import {API_TIMECAMP_TOKEN, JIRA_DOMAIN, JIRA_EMAIL, JIRA_TOKEN, store} from "@src/services/store.js";

const main = async () => {
  if(
    !API_TIMECAMP_TOKEN ||
    !JIRA_TOKEN ||
    !JIRA_EMAIL ||
    !JIRA_DOMAIN
  ) {
    const inputs = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'API_TIMECAMP_TOKEN',
          message: 'Please enter timecamp api token:',
          required: true,
          default: API_TIMECAMP_TOKEN
        },
        {
          type: 'input',
          name: 'JIRA_TOKEN',
          message: 'Please enter Jira API token:',
          required: true,
          default: JIRA_TOKEN
        },
        {
          type: 'input',
          name: 'JIRA_DOMAIN',
          message: 'Please enter jira domain: ',
          required: true,
          default: JIRA_DOMAIN
        },
        {
          type: 'input',
          name: 'JIRA_EMAIL',
          message: 'Please enter jira email: ',
          required: true,
          default: JIRA_EMAIL
        }
      ])

    Object.entries(inputs).forEach(([key, value]) => {
      store.set(key, value)
    })
  }

  await printDailyStandup()
}

await main();
