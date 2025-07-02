import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

describe('DateUtilsService', () => {
  let service: DateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilsService);
  });

  it('should create an instance of service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a string of date in MM/YYYY format', () => {
    const entry: Date = new Date('2025-07-01T03:00:00.000-03:00');
    expect(service.formatDate(entry)).toBe('07/2025');
  });

  it('should return a string of date in DD/MM/YYYY format', () => {
    const entry: Date = new Date('2025-06-09T03:00:00.000-03:00');
    expect(service.formatDate(entry, 'dd/MM/YYYY')).toBe('09/06/2025');
  });

  it('should return a string of date in YYYY format', () => {
    const entry: Date = new Date('2025-02-15T03:00:00.000-03:00');
    expect(service.formatDate(entry, 'YYYY')).toBe('2025');
  });

  it('should return "Presente" of undefined entry', () => {
    expect(service.formatDate(undefined)).toBe('Presente');
  });

  it('should return a period string between two dates in MM/YYYY format', () => {
    const startDate: Date = new Date('2025-01-12T03:00:00.000-03:00');
    const endDate: Date = new Date('2025-03-16T03:00:00.000-03:00');
    expect(service.formatDatePeriod(startDate, endDate)).toBe('01/2025 — 03/2025');
  });

  it('should return a period string of start date and undefined in MM/YYYY format', () => {
    const startDate: Date = new Date('2024-10-19T03:00:00.000-03:00');
    expect(service.formatDatePeriod(startDate, undefined)).toBe('10/2024 — Presente');
  });
});
