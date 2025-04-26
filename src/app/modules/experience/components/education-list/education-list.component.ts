import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../../education/services/education.service';
import { Education } from '../../../../models/education.model';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [DatePipe, TimelineModule],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss'
})
export class EducationListComponent implements OnInit {
  educations!: Education[];

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.educationService.getAll().subscribe({
      next: (response: Education[]) => {
        this.educations = response;
      }
    });
  }
}
