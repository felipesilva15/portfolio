import { TestBed } from '@angular/core/testing';

import { ExperienceService } from './experience.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Experience } from '../../../models/experience.model';
import { environment } from '../../../../environments/environment';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/experience';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ExperienceService
      ]
    });

    service = TestBed.inject(ExperienceService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all experiences from API with GET method', () => {
    const dummyData: Experience[] = [
      { 
        id: 1,
        company_name: 'PWI',
        position: 'Software developer',
        locality: 'São Paulo, S',
        description: 'Desenvolvedor fullstack',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (experiences: Experience[]) => {
        expect(experiences).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
