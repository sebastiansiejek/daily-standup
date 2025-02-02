export const getJiraIssueUrl = (JIRA_DOMAIN: string, issueKey: string) => {
  return `https://${JIRA_DOMAIN}/browse/${issueKey}`;
}
