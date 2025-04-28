import { Routes } from '@angular/router';
import { EducationComponent } from './modules/education/components/education/education.component';
import { ProjectListComponent } from './modules/project/components/project-list/project-list.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
    { path: 'resume', component: EducationComponent },
    { path: 'portfolio', component: PortfolioComponent }
];
