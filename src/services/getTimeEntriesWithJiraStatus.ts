import {getLastTimeEntries} from "@src/services/getLastTimeEntries.ts";
import {getJiraTasks} from "@src/api/getJiraTasks.js";
import {getStoreValue} from "@src/services/store.js";
import {getJiraIssueUrl} from "@src/shared/utils/getJiraIssueUrl.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds/formatDurationFromSeconds.js";

export const getTimeEntriesWithJira = async () => {
  const lastTimeEntries = await getLastTimeEntries()
  const timeEntriesValues = Object.values(lastTimeEntries)

  if (timeEntriesValues.length > 0) {
    const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

    return Object.values(lastTimeEntries)
      .map(entry => {
        const jiraIssue = jiraTasks.data.issues.find(issue => entry.task.name.includes(issue.key))
        const status = jiraIssue?.fields.status?.name || ''
        const link = jiraIssue?.key ? getJiraIssueUrl(getStoreValue('JIRA_DOMAIN'), jiraIssue.key) : ''
        const {task: {name: taskName}, duration, tags = [], description, date} = entry
        const tagNames = tags.map(tag => tag.name).join(', ')
        const formattedDuration = formatDurationFromSeconds(duration)

        return {
          task: taskName,
          description: description || '',
          status,
          tags: tagNames,
          date,
          duration: formattedDuration,
          link,
        }
      })
      .sort((a, b) => b.duration.localeCompare(a.duration))
  }

  return []
}
