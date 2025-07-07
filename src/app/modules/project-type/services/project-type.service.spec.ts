import { TestBed } from '@angular/core/testing';

import { ProjectTypeService } from './project-type.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { ProjectType } from '../../../models/project-type.model';

describe('ProjectTypeService', () => {
  let service: ProjectTypeService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/project-type';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProjectTypeService
      ]
    });

    service = TestBed.inject(ProjectTypeService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all project types from API with GET method', () => {
    const dummyData: ProjectType[] = [
      { 
        id: 1,
        name: 'Frontend',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (projectTypes: ProjectType[]) => {
        expect(projectTypes).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
