import {describe, expect, it, vi} from 'vitest';
import dayjs from 'dayjs';
import {getStartDate} from "@src/shared/utils/getStartDate/getStartDate.js";

describe('getStartDate', () => {
  it('should return the date 3 days ago if today is Sunday (day 0)', () => {
    const mockDate = dayjs('2023-10-15'); // A Sunday
    vi.setSystemTime(mockDate.toDate());

    const result = getStartDate();
    const expectedDate = mockDate.subtract(3, 'days');

    expect(result.format()).toBe(expectedDate.format());
    vi.useRealTimers();
  });

  it('should return the date 4 days ago if today is Monday (day 1)', () => {
    const mockDate = dayjs('2023-10-16'); // A Monday
    vi.setSystemTime(mockDate.toDate());

    const result = getStartDate();
    const expectedDate = mockDate.subtract(4, 'days');

    expect(result.format()).toBe(expectedDate.format());
    vi.useRealTimers();
  });

  it('should return the date 2 days ago if today is a weekday other than Sunday or Monday', () => {
    const mockDate = dayjs('2023-10-17'); // A Tuesday
    vi.setSystemTime(mockDate.toDate());

    const result = getStartDate();
    const expectedDate = mockDate.subtract(2, 'days');

    expect(result.format()).toBe(expectedDate.format());
    vi.useRealTimers();
  });
});
