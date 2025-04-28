import { Component } from '@angular/core';
import { ProjectListComponent } from "../../modules/project/components/project-list/project-list.component";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectListComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  constructor() { }
}
