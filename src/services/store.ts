import Conf from "conf";

export type StoreKeys = 'API_TIMECAMP_TOKEN' | 'JIRA_TOKEN' | 'JIRA_EMAIL' | 'JIRA_DOMAIN'

export const store = new Conf({
  projectName: 'daily-standup',
});

export const getStoreValue = (key: StoreKeys) => store.get(key) as string

export const setStoreValue  = (key: StoreKeys, value: string) => store.set(key, value)
