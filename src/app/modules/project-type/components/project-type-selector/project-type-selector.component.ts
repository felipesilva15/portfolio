import { Component, effect, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { ProjectType } from '../../../../models/project-type.model';
import { ProjectTypeService } from '../../services/project-type.service';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-project-type-selector',
  standalone: true,
  imports: [
    ButtonModule,
    SelectModule,
    FormsModule,
    SkeletonModule
  ],
  templateUrl: './project-type-selector.component.html',
  styleUrl: './project-type-selector.component.scss'
})
export class ProjectTypeSelectorComponent {
  projectTypes!: ProjectType[];
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  selectedProjectType: WritableSignal<ProjectType | undefined> = signal<ProjectType | undefined>(undefined);
  @Output() selectProjectTypeEvent = new EventEmitter<ProjectType>();

  constructor(private projectTypeService: ProjectTypeService) {
    effect(() => {
      if (this.selectedProjectType()) {
        this.onProjectTypeSelected();
      }
    })
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);

    this.projectTypeService.getAll()
    .pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (res: ProjectType[]) => {
        this.projectTypes = res;
        this.projectTypes.unshift({
          id: 0,
          name: 'Todos'
        });

        this.selectedProjectType.set(this.projectTypes[0]);
      }
    });
  }

  onProjectTypeSelected(): void {
    this.selectProjectTypeEvent.emit(this.selectedProjectType());
  }
}
