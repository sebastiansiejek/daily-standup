import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getStoreValue } from '@src/services/store.js'
import {getJiraTasks} from "@src/api/getJiraTasks.js";

vi.mock('@src/services/store.js', () => ({
  getStoreValue: vi.fn()
}))

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('getJiraTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getStoreValue)
      .mockImplementation((key: string) => {
        switch(key) {
          case 'JIRA_DOMAIN':
            return 'jira.example.com'
          case 'JIRA_EMAIL':
            return 'test@example.com'
          case 'JIRA_TOKEN':
            return 'test-token'
          default:
            return ''
        }
      })
  })

  it('should extract task IDs and fetch Jira issues', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({
        issues: [
          { id: '1', key: 'TCD-123', fields: { status: 'Done', summary: 'Test task' } }
        ]
      })
    }

    mockFetch.mockResolvedValueOnce(mockResponse)

    const result = await getJiraTasks(['[TCD-123] Test task'])

    expect(mockFetch).toHaveBeenCalledWith(
      'https://jira.example.com/rest/api/3/search',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': expect.any(String),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jql: 'key in ("TCD-123")',
          fields: ['status', 'summary']
        })
      })
    )

    expect(result.data.issues).toHaveLength(1)
    expect(result.data.issues[0].key).toBe('TCD-123')
  })

  it('should return empty issues array when no valid Jira issue IDs are provided', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ issues: [] })
    }
    mockFetch.mockResolvedValueOnce(mockResponse)

    const result = await getJiraTasks(['Invalid task name'])

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data.issues).toEqual([])
  })

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    })

    await expect(getJiraTasks(['[TCD-123] Test task']))
      .rejects
      .toThrow('Response is not ok 400 Bad Request')
  })
})
