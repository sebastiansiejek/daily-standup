import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";
import {getJiraTasks} from "@src/api/getJiraTasks.js";
import {getJiraIssueUrl} from "@src/shared/utils/getJiraIssueUrl.js";

const lastTimeEntries = await getLastTimeEntries()
const timeEntriesValues = Object.values(lastTimeEntries)

if (timeEntriesValues.length > 0) {
  const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

  Object.values(lastTimeEntries)
    .map(entry => {
      const jiraIssue = jiraTasks.data.issues.find(issue => entry.task.name.includes(issue.key))
      const status = jiraIssue?.fields.status?.name || ''
      const linkToIssue = jiraIssue?.key ? getJiraIssueUrl(process.env.JIRA_DOMAIN, jiraIssue.key) : ''

      return {
        ...entry,
        status,
        linkToIssue
      }
    })
    .sort((a, b) =>  b.status.localeCompare(a.status))
    .forEach(({task: {name}, duration, tags = [], description, status, linkToIssue}, index) => {
    const position = `${index + 1}.`
    const tagNames = tags.map(tag => tag.name).join(', ')
    const formattedDuration = formatDurationFromSeconds(duration)

    const result = `${position} ${status} | ${name} | ${description || ''} | ${tagNames} | ${formattedDuration} | ${linkToIssue}`

    console.log(result)
  })
}
