import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { 
                path: '', 
                loadComponent: () => import('./pages/about-me/about-me.component').then(
                    c => c.AboutMeComponent
                )
            },
            { 
                path: 'resume', 
                loadComponent: () => import('./pages/resume/resume.component').then(
                    c => c.ResumeComponent
                )
            },
            { 
                path: 'portfolio', 
                loadComponent: () => import('./pages/portfolio/portfolio.component').then(
                    c => c.PortfolioComponent
                )
            },
            { 
                path: 'contact', 
                loadComponent: () => import('./pages/contact/contact.component').then(
                    c => c.ContactComponent
                )
            }
        ]
    }
];
