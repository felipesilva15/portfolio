import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ApiError } from '../../../../models/api-error.data';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.projectService.getAll().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: (error: ApiError) => {
        console.error(error);
      }
    });
  }
}
