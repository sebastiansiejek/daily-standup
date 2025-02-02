import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";
import {getJiraTasks} from "@src/api/getJiraTasks.js";

const lastTimeEntries = await getLastTimeEntries()
const timeEntriesValues = Object.values(lastTimeEntries)

function getJiraIssueUrl(JIRA_DOMAIN: string, issueKey: string): string {
  return `https://${JIRA_DOMAIN}/browse/${issueKey}`;
}

if (timeEntriesValues.length > 0) {
  const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

  Object.values(lastTimeEntries).forEach(({task: {name}, duration, tags = []}) => {
    const tagNames = tags.map(tag => tag.name).join(', ')
    const formattedDuration = formatDurationFromSeconds(duration)
    const jiraIssue = jiraTasks.data.issues.find(issue => name.includes(issue.key))
    const status = jiraIssue?.fields.status?.name || ''
    const linkToIssue = jiraIssue?.key ? getJiraIssueUrl(process.env.JIRA_DOMAIN, jiraIssue.key) : ''

    console.log(name, tagNames, formattedDuration, status, linkToIssue)
  })
}
