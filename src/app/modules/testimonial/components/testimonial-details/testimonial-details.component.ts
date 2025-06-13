import { Component } from '@angular/core';
import { Testimonial } from '../../../../models/testimonial.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testimonial-details',
  standalone: true,
  imports: [ButtonModule, DatePipe],
  templateUrl: './testimonial-details.component.html',
  styleUrl: './testimonial-details.component.scss'
})
export class TestimonialDetailsComponent {
  testimonial!: Testimonial;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.testimonial = this.config?.data;
  }

  close(): void {
    this.ref.close();
  }
}
