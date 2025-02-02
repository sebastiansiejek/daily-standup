import {getLastTimeEntries} from "@src/services/getLastTimeEntries.js";
import {formatDurationFromSeconds} from "@src/shared/utils/formatDurationFromSeconds.js";

const lastTimeEntries = await getLastTimeEntries()

Object.values(lastTimeEntries).forEach(({task: {name}, duration, tags = []}) => {
  const tagNames = tags.map(tag => tag.name).join(', ')
  const formattedDuration = formatDurationFromSeconds(duration)

  console.log(name, tagNames, formattedDuration)
})
