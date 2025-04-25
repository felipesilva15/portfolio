import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../modules/projects/services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
