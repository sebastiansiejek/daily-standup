import * as process from "node:process";
import dayjs from 'dayjs'
import type {TimeEntries} from "@src/shared/types/timeEntries.types.js";
import {API_TIMECAMP_TOKEN} from "@src/services/store.js";


export const getTimeEntries = async ({startDate, endDate}: {
  startDate: Date,
  endDate: Date
}) => {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", API_TIMECAMP_TOKEN);

  const response = await fetch("https://app.timecamp.com/third_party/api/v3/time-entries", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD')
    }),
    redirect: "follow"
  })

  if (!response.ok) {
    throw new Error('Response is not ok')
  }

  return {
    ...response,
    data: await response.json() as TimeEntries
  }
 }
