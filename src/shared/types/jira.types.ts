export type JiraIssue = {
  expand: string,
  id: string,
  self: string,
  key: string,
  fields: {
    summary: string,
    status: {
      self: string,
      description: string,
      iconUrl: string,
      name: string,
      id: string,
    }
  }
}
