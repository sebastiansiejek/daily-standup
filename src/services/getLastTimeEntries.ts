import {getTimeEntries} from "@src/api/getTimeEntries.js";
import type {TimeEntries, TimeEntry} from "@src/shared/types/timeEntries.types.js";
import {getStartDate} from "@src/shared/utils/getStartDate.js";
import {getEndDate} from "@src/shared/utils/getEndDate.js";

const groupByTaskAndSumDuration =(entries: TimeEntries): Record<TimeEntry['task']['name'], TimeEntry> => {
  return entries.reduce((acc, entry) => {
    const taskName = entry.task.name;

    if (!acc[taskName]) {
      acc[taskName] = {
        ...entry,
        duration: 0
      };
    }

    acc[taskName]['duration'] += entry.duration;

    return acc;

  }, {} as Record<TimeEntry['task']['name'], TimeEntry>);
}

export const getLastTimeEntries = async () => {
  const timeEntries = (await getTimeEntries({
    startDate: getStartDate().toDate(),
    endDate: getEndDate().toDate()
  })).data

  return groupByTaskAndSumDuration(timeEntries)
}
