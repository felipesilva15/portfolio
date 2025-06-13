import { DynamicDialogService } from './../../../../shared/services/dynamic-dialog.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { Testimonial } from '../../../../models/testimonial.model';
import { TestimonialService } from '../../services/testimonial.service';
import { finalize } from 'rxjs';
import { ApiError } from '../../../../models/api-error.data';
import { SkeletonModule } from 'primeng/skeleton';
import { TestimonialDetailsComponent } from '../testimonial-details/testimonial-details.component';
import { DialogSize } from '../../../../shared/enums/dialog-size';

@Component({
  selector: 'app-testimonial-list',
  standalone: true,
  imports: [
    SkeletonModule
  ],
  templateUrl: './testimonial-list.component.html',
  styleUrl: './testimonial-list.component.scss'
})
export class TestimonialListComponent {
  testimonials!: Testimonial[];
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private testimonialService: TestimonialService, private dynamicDialogService: DynamicDialogService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);

    this.testimonialService.getAll()
    .pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response: Testimonial[]) => {
        this.testimonials = response;
        this.treatTestimonialText();
        this.sortTestimonials();
      },
      error: (error: ApiError) => {
        console.error(error);
      }
    });
  }

  treatTestimonialText(): void {
    this.testimonials.map((testimonial: Testimonial) => {
      testimonial.testimonial = testimonial.testimonial.replace(/\r\n|\n|\r/g, '<br>');
    })

    console.log(this.testimonials)
  }

  sortTestimonials(): void {
    this.testimonials.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  showDetails(testimonial: Testimonial): void {
    this.dynamicDialogService.open(TestimonialDetailsComponent, {
      data: testimonial, 
      size: DialogSize.Medium,
      title: testimonial.name,
      closeable: true
    });
  }
}
