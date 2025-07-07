import { DateUtilsService } from './../../../../shared/utils/date-utils.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ExperienceService } from '../../services/experience.service';
import { TimelineItem } from '../../../../models/timeline-item.data';
import { Experience } from '../../../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  experiences!: Experience[];
  timelineList!: TimelineItem[];

  constructor(private experienceService: ExperienceService, private dateUtilsService: DateUtilsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.experienceService.getAll().subscribe({
      next: (response: Experience[]) => {
        this.experiences = response;
        this.sortExperiences();
        this.makeTimelineList();
      }
    });
  }

  sortExperiences(): void {
    this.experiences.sort((a, b) => {
      const dateA = a.end_date ? new Date(a.end_date) : new Date();
      const dateB = b.end_date ? new Date(b.end_date) : new Date();
      return dateB.getTime() - dateA.getTime();
    });
  }

  makeTimelineList(): void {
    this.timelineList = [];

    this.experiences.map((experience) => {
      this.timelineList.push({
        title: experience.position,
        subtitle: this.dateUtilsService.formatDatePeriod(experience.start_date, experience.end_date),
        description: `${experience.company_name} - ${experience.locality} \r\r ${experience.description}`
      });
    });
  }
}
