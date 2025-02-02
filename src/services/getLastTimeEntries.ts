import {getTimeEntries} from "@src/api/getTimeEntries.js";
import dayjs from "dayjs";
import type {TimeEntries, TimeEntriesResponse, TimeEntry} from "@src/shared/types/timeEntries.types.js";

const today = dayjs();

const getStartDate = () => {
  const today = dayjs();
  const dayOfWeek = today.day()

  switch (dayOfWeek) {
    case 6:
      return today.subtract(2, "day");
    case 0:
      return today.subtract(3, "days");
    case 1:
      return today.subtract(4, "days");
    default:
      return today.subtract(1, "days");
  }
}

function groupByTaskAndSumDuration(entries: TimeEntries): Record<TimeEntry['task']['name'], TimeEntry> {
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
    endDate: today.toDate()
  })).data


  return groupByTaskAndSumDuration(timeEntries)
}
