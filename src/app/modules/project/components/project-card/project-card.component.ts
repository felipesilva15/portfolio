import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { DialogSize } from '../../../../shared/enums/dialog-size';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, ImageModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  maxTags: number = 4;

  constructor(private dynamicDialogService: DynamicDialogService) { }

  moreTagsText(): string {
    const otherTagsCount: number = this.project.tags.length - this.maxTags;
    return `+${otherTagsCount.toString()}`;
  }

  openDetailsDialog(project: Project): void {
    this.dynamicDialogService.open(ProjectDetailsComponent, {
          data: project, 
          size: DialogSize.Medium, 
          closeable: false,
          styleClass: 'blank-dialog'
        });
  }
}
