/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    API_TIMECAMP_TOKEN: string
    JIRA_TOKEN: string
    JIRA_DOMAIN: string
    JIRA_EMAIL: string
  }
}
