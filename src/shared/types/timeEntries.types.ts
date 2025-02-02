
export type TimeEntry = {
  id: number,
  project_id: number,duration: number,
  invoice_id: number,
  last_modify: string,
  date: string,
  start_time: string,
  end_time: string,
  billable: boolean,
  description: null | string,
  user: {
  id: number,
    email: string,
    display_name: string
  },
  task: {
    id: number,
      name: string,
      color: string,
      billable: boolean,
      archived: 0 | 1
  },
  tags: Array<{
    id: number,
    name: string,
    tag_list: {
      id: number,
      name: string
    }
  }>
}

export type TimeEntries = TimeEntry[]
