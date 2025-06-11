import { Component, signal, WritableSignal } from '@angular/core';
import { Testimonial } from '../../../../models/testimonial.model';
import { TestimonialService } from '../../services/testimonial.service';
import { finalize } from 'rxjs';
import { ApiError } from '../../../../models/api-error.data';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';

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

  constructor(private testimonialService: TestimonialService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);

    this.testimonialService.getAll()
    .pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (res: Testimonial[]) => {
        this.testimonials = res;
      },
      error: (error: ApiError) => {
        console.error(error);
      }
    });
  }

  showDetails(): void {
    alert('Teste!');
  }
}
