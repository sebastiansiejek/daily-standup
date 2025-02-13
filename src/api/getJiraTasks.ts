import type {JiraIssue} from "@src/shared/types/jira.types.js";
import {getStoreValue} from "@src/services/store.js";

const extractTaskId = (taskName: string): string | null => {
  const match = taskName.match(/\[(TCD-\d+)\]/);
  return match ? match[1] : null;
}

export const getJiraTasks = async (taskNames: string[]) => {
  const extractedTaskIds = taskNames
    .map(extractTaskId)
    .filter((id): id is string => id !== null);
  const jql = `key in (${extractedTaskIds.map(id => `"${id}"`).join(', ')})`;
  const url = `https://${getStoreValue('JIRA_DOMAIN')}/rest/api/3/search`;

  const auth = Buffer.from(`${getStoreValue('JIRA_EMAIL')}:${getStoreValue('JIRA_TOKEN')}`).toString('base64');

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
