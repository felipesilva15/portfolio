import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EducationComponent } from '../../modules/education/components/education/education.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    SharedModule,
    EducationComponent
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {

}
