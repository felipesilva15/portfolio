import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { EducationListComponent } from "../education-list/education-list.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [AvatarModule, EducationListComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

}
