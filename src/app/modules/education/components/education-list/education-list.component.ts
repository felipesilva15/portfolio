import { DateUtilsService } from './../../../../shared/utils/date-utils.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { Education } from '../../../../models/education.model';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe, formatDate } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TimelineItem } from '../../../../models/timeline-item.data';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [TimelineModule, SharedModule],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss'
})
export class EducationListComponent implements OnInit {
  educations!: Education[];
  timelineList!: TimelineItem[];

  constructor(private educationService: EducationService, private dateUtilsService: DateUtilsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.educationService.getAll().subscribe({
      next: (response: Education[]) => {
        this.educations = response;
        this.sortEducations();
        this.makeTimelineList();
      }
    });
  }

  sortEducations(): void {
    this.educations.sort((a, b) => {
      const dateA = a.end_date ? new Date(a.end_date) : new Date();
      const dateB = b.end_date ? new Date(b.end_date) : new Date();
      return dateB.getTime() - dateA.getTime();
    });
  }

  makeTimelineList(): void {
    this.timelineList = [];

    this.educations.map((education) => {
      this.timelineList.push({
        title: education.degree,
        subtitle: this.dateUtilsService.formatDatePeriod(education.start_date, education.end_date),
        description: `${education.institution_name} - ${education.locality}`
      });
    });
  }
}
