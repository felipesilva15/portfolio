import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ApiError } from '../../../../models/api-error.data';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectType } from '../../../../models/project-type.model';
import { ProjectTypeSelectorComponent } from "../../../project-type/components/project-type-selector/project-type-selector.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent, ProjectTypeSelectorComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects!: Project[];
  filteredProjects!: Project[];
  selectedProjectType?: ProjectType;

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

  filterProjectType(projectType?: ProjectType): void {
      if (!projectType?.id) {
        this.filteredProjects = this.projects;
        return;
      }

      this.filteredProjects = this.projects.filter((project: Project) => {
        return project.project_type.id == projectType.id;
      });
    }
}
