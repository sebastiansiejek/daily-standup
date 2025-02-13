export const getTimeEntriesWithJiraStatus = async () => {
  const response = await fetch('/api/data', {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Response is not ok')
  }

  return response.json();
}
