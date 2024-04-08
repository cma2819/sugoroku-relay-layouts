import { describe, expect, it } from '@jest/globals';
import { Timer } from './timer';

describe('Testing timer', () => {
  describe('when initialize timer', () => {
    const timer = Timer({
      start: new Date(Date.parse('2024-04-08T10:00:00Z')),
      end: new Date(Date.parse('2024-04-15T21:00:00Z')),
      isCountdown: true,
    });

    it('should be get current time 0', () => {
      expect(timer.getCurrentTimeInSeconds()).toBe(0);
    });

    it('should display time as "00:00"', () => {
      expect(timer.getDisplayTime()).toBe('00:00');
    });
  });

  describe('when tick with 1000 ms after', () => {
    const timer = Timer({
      start: new Date(Date.parse('2024-04-08T10:00:00Z')),
      end: new Date(Date.parse('2024-04-15T21:00:00Z')),
      isCountdown: true,
    });
    const tickTime = new Date(Date.parse('2024-04-08T10:00:00Z') + 1000);
    timer.tick(tickTime);

    it('should be get current time as 1s after', () => {
      expect(timer.getCurrentTimeInSeconds()).toBe(644400 - 1);
    });

    it('should display time as 1s after', () => {
      expect(timer.getDisplayTime()).toBe('178:59:59');
    });
  });
});