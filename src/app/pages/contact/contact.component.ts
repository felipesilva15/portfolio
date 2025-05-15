import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ContactFormComponent } from "../../modules/contact/components/contact-form/contact-form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
