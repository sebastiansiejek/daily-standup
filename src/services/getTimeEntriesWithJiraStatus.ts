import {getLastTimeEntries} from "@src/services/getLastTimeEntries.ts";
import {getJiraTasks} from "@src/api/getJiraTasks.js";
import {getStoreValue} from "@src/services/store.js";
import {getJiraIssueUrl} from "@src/shared/utils/getJiraIssueUrl.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds/formatDurationFromSeconds.js";
import {JiraIssue} from "@src/shared/types/jira.types.js";
import {JIRA_SPRINT_KEY} from "@src/shared/constants.js";

const getIssueSprint = (issue: JiraIssue) => {
  const sprints = issue?.fields?.[JIRA_SPRINT_KEY]

  if(sprints) {
    const sprint = sprints[0]

    if (sprint.state === 'active') {
      return sprint
    }
  }

  return null;
}

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
          sprint: jiraIssue ? getIssueSprint(jiraIssue)?.name : '',
          link,
        }
      })
      .sort((a, b) => b.duration.localeCompare(a.duration))
  }

  return []
}
