import { describe, it, expect, vi } from 'vitest';
import { formatDate, formatTime, isPastDate, getCurrentDate, combineDateTime } from '../dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date from YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(formatDate('2024-09-25')).toBe('25/09/2024');
      expect(formatDate('2024-12-31')).toBe('31/12/2024');
      expect(formatDate('2024-01-01')).toBe('01/01/2024');
    });

    it('should return original string for invalid date format', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate('invalid')).toBe('invalid');
      expect(formatDate('2024-9-25')).toBe('2024-9-25'); 
      expect(formatDate('2024-09-5')).toBe('2024-09-5'); 
    });
  });

  describe('formatTime', () => {
    it('should return time string as is for valid format', () => {
      expect(formatTime('14:30')).toBe('14:30');
      expect(formatTime('09:00')).toBe('09:00');
      expect(formatTime('23:59')).toBe('23:59');
    });

    it('should return original string for invalid time format', () => {
      expect(formatTime('')).toBe('');
      expect(formatTime('invalid')).toBe('invalid');
      expect(formatTime('14:3')).toBe('14:3'); 
      expect(formatTime('25:00')).toBe('25:00'); 
    });
  });

  describe('isPastDate', () => {
    it('should return true for past dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      expect(isPastDate(yesterdayString)).toBe(true);
    });

    it('should return false for today and future dates', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(isPastDate(today)).toBe(false);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];
      
      expect(isPastDate(tomorrowString)).toBe(false);
    });
  });

  describe('getCurrentDate', () => {
    it('should return current date in YYYY-MM-DD format', () => {
      const currentDate = getCurrentDate();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      
      expect(dateRegex.test(currentDate)).toBe(true);
      
      const today = new Date().toISOString().split('T')[0];
      expect(currentDate).toBe(today);
    });
  });

  describe('combineDateTime', () => {
    it('should combine date and time into Date object', () => {
      const dateString = '2024-09-25';
      const timeString = '14:30';
      
      const result = combineDateTime(dateString, timeString);
      
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(8); 
      expect(result.getDate()).toBe(25);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it('should handle different time formats', () => {
      const dateString = '2024-09-25';
      
      const morning = combineDateTime(dateString, '09:00');
      expect(morning.getHours()).toBe(9);
      expect(morning.getMinutes()).toBe(0);
      
      const evening = combineDateTime(dateString, '23:59');
      expect(evening.getHours()).toBe(23);
      expect(evening.getMinutes()).toBe(59);
    });
  });
});
