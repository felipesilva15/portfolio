import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, ImageModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  constructor() { }
}
