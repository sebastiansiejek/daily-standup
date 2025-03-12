import {describe, it, expect} from 'vitest'
import {formatDurationFromSeconds} from '@src/shared/utils/formatDurationFromSeconds/formatDurationFromSeconds.js'

describe('formatDurationFromSeconds', () => {
  it('should format 0 seconds correctly', () => {
    expect(formatDurationFromSeconds(0)).toBe('00:00:00')
  })

  it('should format seconds less than a minute correctly', () => {
    expect(formatDurationFromSeconds(45)).toBe('00:00:45')
  })

  it('should format exactly 1 minute correctly', () => {
    expect(formatDurationFromSeconds(60)).toBe('00:01:00')
  })

  it('should format minutes and seconds correctly', () => {
    expect(formatDurationFromSeconds(125)).toBe('00:02:05')
  })

  it('should format exactly 1 hour correctly', () => {
    expect(formatDurationFromSeconds(3600)).toBe('01:00:00')
  })

  it('should format hours, minutes, and seconds correctly', () => {
    expect(formatDurationFromSeconds(3665)).toBe('01:01:05')
  })

  it('should handle large durations correctly', () => {
    expect(formatDurationFromSeconds(7265)).toBe('02:01:05')
  })
})
