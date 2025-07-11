import { CertificationService } from './../../services/certification.service';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { Certification } from '../../../../models/certification.model';
import { TimelineItem } from '../../../../models/timeline-item.data';
import { DateUtilsService } from '../../../../shared/utils/date-utils.service';

@Component({
  selector: 'app-certification',
  standalone: true,
    imports: [
      SharedModule,
      SkeletonModule
    ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent {
  certifications!: Certification[];
  timelineList!: TimelineItem[];

  constructor(private certificationService: CertificationService, private dateUtilsService: DateUtilsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.certificationService.getAll().subscribe({
      next: (response: Certification[]) => {
        this.certifications = response;
        this.sortCertifications();
        this.makeTimelineList();
      }
    });
  }

  sortCertifications(): void {
    this.certifications.sort((a, b) => {
      const dateA = new Date(a.issued_date);
      const dateB = new Date(b.issued_date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  makeTimelineList(): void {
    this.timelineList = [];

    this.certifications.map((certification) => {
      this.timelineList.push({
        title: certification.title,
        subtitle: `${certification.institution_name} — Emitida em ${this.dateUtilsService.formatDate(certification.issued_date, 'MM/yyyy')}`,
        linkUrl: certification.credential_url,
        linkLabel: 'Exibir certificado'
      });
    });
  }
}
