import {JIRA_SPRINT_KEY} from "@src/shared/constants.js";

export type JiraIssue = {
  expand: string,
  id: string,
  self: string,
  key: string,
  fields: {
    summary: string,
    [JIRA_SPRINT_KEY]: {
      id: number
      name: string
      state: string
      boardId: number
      goal: string
      startDate: string
      endDate: string
      completeDate: string
    }[]
    status: {
      self: string,
      description: string,
      iconUrl: string,
      name: string,
      id: string,
    }
  }
}
