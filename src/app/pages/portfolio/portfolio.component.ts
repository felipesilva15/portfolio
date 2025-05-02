import { Component } from '@angular/core';
import { ProjectListComponent } from "../../modules/project/components/project-list/project-list.component";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectListComponent, SharedModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  constructor() { }
}
