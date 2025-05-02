import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { EducationListComponent } from "../education-list/education-list.component";
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [AvatarModule, EducationListComponent, SharedModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

}
