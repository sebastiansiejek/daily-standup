import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";
import {getJiraTasks} from "@src/api/getJiraTasks.js";

const lastTimeEntries = await getLastTimeEntries()
const timeEntriesValues = Object.values(lastTimeEntries)

if (timeEntriesValues.length > 0) {
  const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

  Object.values(lastTimeEntries).forEach(({task: {name}, duration, tags = []}) => {
    const tagNames = tags.map(tag => tag.name).join(', ')
    const formattedDuration = formatDurationFromSeconds(duration)
    const status = jiraTasks.data.issues.find(issue => name.includes(issue.key))?.fields.status?.name || 'Unknown'

    console.log(name, tagNames, formattedDuration, status)
  })
}
