import {getStoreValue, setStoreValue, type StoreKeys} from "@src/services/store.js";
import inquirer from "inquirer";
import {printDailyStandup} from "@src/services/printDailyStandup.js";

export const start = async () => {
  const API_TIMECAMP_TOKEN = getStoreValue('API_TIMECAMP_TOKEN')
  const JIRA_TOKEN = getStoreValue('JIRA_TOKEN')
  const JIRA_EMAIL = getStoreValue('JIRA_EMAIL')
  const JIRA_DOMAIN = getStoreValue('JIRA_DOMAIN')

  if (
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
      ]) as Record<StoreKeys, string>

    Object.entries(inputs).forEach(([key, value]) => {
      setStoreValue(key as StoreKeys, value)
    })
  }

  await printDailyStandup()
}
