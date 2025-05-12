import { Component, EventEmitter, Output } from '@angular/core';
import { ProjectType } from '../../../../models/project-type.model';
import { ProjectTypeService } from '../../services/project-type.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-type-selector',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './project-type-selector.component.html',
  styleUrl: './project-type-selector.component.scss'
})
export class ProjectTypeSelectorComponent {
  projectTypes!: ProjectType[];
  selectedProjectType?: ProjectType;
  @Output() selectProjectTypeEvent = new EventEmitter<ProjectType>();

  constructor(private projectTypeService: ProjectTypeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.projectTypeService.getAll().subscribe({
      next: (res: ProjectType[]) => {
        this.projectTypes = res;
        this.projectTypes.unshift({
          id: 0,
          name: 'Todos'
        });

        this.onProjectTypeSelected(this.projectTypes[0]);
      }
    });
  }

  onProjectTypeSelected(projectType: ProjectType): void {
    this.selectedProjectType = projectType;
    this.selectProjectTypeEvent.emit(this.selectedProjectType);
  }
}
