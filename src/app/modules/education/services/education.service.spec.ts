import { TestBed } from '@angular/core/testing';

import { EducationService } from './education.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Education } from '../../../models/education.model';

describe('EducationService', () => {
  let service: EducationService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/education';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EducationService
      ]
    });

    service = TestBed.inject(EducationService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all educations from API with GET method', () => {
    const dummyData: Education[] = [
      { 
        id: 1,
        institution_name: 'Senac',
        degree: 'Tecnologia da informação',
        locality: 'São Paulo, SP',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (educations: Education[]) => {
        expect(educations).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
