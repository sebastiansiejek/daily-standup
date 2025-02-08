import Conf from "conf";

export const store = new Conf({
  projectName: 'daily-standup',
});

const API_TIMECAMP_TOKEN = store.get('API_TIMECAMP_TOKEN') as string
const JIRA_TOKEN = store.get('JIRA_TOKEN') as string
const JIRA_EMAIL = store.get('JIRA_EMAIL') as string
const JIRA_DOMAIN = store.get('JIRA_DOMAIN') as string

export {
  API_TIMECAMP_TOKEN,
  JIRA_TOKEN,
  JIRA_EMAIL,
  JIRA_DOMAIN
}
