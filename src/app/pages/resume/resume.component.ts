import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EducationComponent } from '../../modules/education/components/education/education.component';
import { ExperienceComponent } from "../../modules/experience/components/experience/experience.component";
import { SkillComponent } from "../../modules/skill/components/skill/skill.component";
import { CertificationComponent } from "../../modules/certification/certification/certification.component";

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    SharedModule,
    EducationComponent,
    ExperienceComponent,
    SkillComponent,
    CertificationComponent
],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {

}
