import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  constructor(@Inject(LOCALE_ID) private locale: string) { }

  formatDatePeriod(startDate: Date, endDate?: Date): string {
    const formattedDatePeriod: string = `${this.formatDate(startDate)} — ${this.formatDate(endDate)}`;

    return formattedDatePeriod;
  }

  formatDate(date?: Date, format: string = 'MM/YYYY'): string {
    if (!date) {
      return 'Presente';
    }

    return formatDate(date, format, this.locale)
  }
}
