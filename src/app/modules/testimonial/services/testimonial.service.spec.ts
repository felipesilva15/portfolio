import { TestBed } from '@angular/core/testing';

import { TestimonialService } from './testimonial.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Testimonial } from '../../../models/testimonial.model';
import { Sex } from '../../../shared/enums/sex';

describe('TestimonialService', () => {
  let service: TestimonialService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/testimonial';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TestimonialService
      ]
    });

    service = TestBed.inject(TestimonialService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all testimonials from API with GET method', () => {
    const dummyData: Testimonial[] = [
      { 
        id: 1,
        user_id: 1,
        name: 'Pedro',
        sex: Sex.Male,
        date: new Date(),
        testimonial: '<p>Um testemunho.</p>',
        original_url: 'https://linkedin/pedro',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (testimonials: Testimonial[]) => {
        expect(testimonials).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
