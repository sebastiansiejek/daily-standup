import * as process from "node:process";
import type {JiraIssue} from "@src/shared/types/jira.types.js";
import {JIRA_DOMAIN, JIRA_EMAIL, JIRA_TOKEN} from "@src/services/store.js";

function extractTaskId(taskName: string): string | null {
  const match = taskName.match(/\[(TCD-\d+)\]/);
  return match ? match[1] : null;
}

export const getJiraTasks = async (taskNames: string[]) => {
  const extractedTaskIds = taskNames
    .map(extractTaskId)
    .filter((id): id is string => id !== null);
  const jql = `key in (${extractedTaskIds.map(id => `"${id}"`).join(', ')})`;
  const url = `https://${JIRA_DOMAIN}/rest/api/3/search`;

  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      jql,
      fields: ['status', 'summary']
    })
  })

  if (!response.ok) {
    throw new Error(`Response is not ok ${response.status} ${response.statusText}`)
  }

  return {
    ...response,
    data: (await response.json()) as {
      issues: JiraIssue[]
    }
  }
}
