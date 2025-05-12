import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Project } from '../../../../models/project.model';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [TagModule, DividerModule, ButtonModule, DatePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.project = this.config?.data;
  }

  close(): void {
    this.ref.close();
  }
}
