import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";
import {getJiraTasks} from "@src/api/getJiraTasks.js";

const lastTimeEntries = await getLastTimeEntries()
const jiraTasks = await getJiraTasks(Object.keys(lastTimeEntries))

console.log(jiraTasks.data.issues)

Object.values(lastTimeEntries).forEach(({task: {name}, duration, tags = []}) => {
  const tagNames = tags.map(tag => tag.name).join(', ')
  const formattedDuration = formatDurationFromSeconds(duration)

  console.log(name, tagNames, formattedDuration)
})
