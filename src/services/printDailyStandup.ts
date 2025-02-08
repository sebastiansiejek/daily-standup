import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {getJiraTasks} from "@src/api/getJiraTasks.js";
import {getJiraIssueUrl} from "@src/shared/utils/getJiraIssueUrl.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";
import Table from 'cli-table3'
import {JIRA_DOMAIN} from "@src/services/store.js";

export const printDailyStandup = async () => {
  const lastTimeEntries = await getLastTimeEntries()
  const timeEntriesValues = Object.values(lastTimeEntries)

  if (timeEntriesValues.length > 0) {
    const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

    const data = Object.values(lastTimeEntries)
      .map(entry => {
        const jiraIssue = jiraTasks.data.issues.find(issue => entry.task.name.includes(issue.key))
        const status = jiraIssue?.fields.status?.name || ''
        const linkToIssue = jiraIssue?.key ? getJiraIssueUrl(JIRA_DOMAIN, jiraIssue.key) : ''
        const {task: {name}, duration, tags = [], description, date} = entry
        const tagNames = tags.map(tag => tag.name).join(', ')
        const formattedDuration = formatDurationFromSeconds(duration)

        return {
          name,
          description: description || '',
          status,
          linkToIssue,
          tags: tagNames,
          date,
          duration: formattedDuration,
        }
      })
      .sort((a, b) => b.duration.localeCompare(a.duration))

    const table = new Table({
      head: ['Task', 'Description', 'Status', 'Link', 'Tags', 'Date', 'Duration'],
      colWidths: [25, 20, 15, 20, 20, 15, 20]
    })

    data.forEach((items) => {
      table.push(Object.values(items))
    })

    console.log(table.toString());
  }
}
