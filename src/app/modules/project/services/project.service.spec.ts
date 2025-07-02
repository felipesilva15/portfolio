import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { ProjectStatus } from '../../../shared/enums/project-status';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/project';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProjectService
      ]
    });

    service = TestBed.inject(ProjectService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all projects from API with GET method', () => {
    const dummyData: Project[] = [
      { 
        id: 1,
        title: 'Portfólio',
        description: '<p>Uma página sobre mim</p>',
        short_description: 'Uma página sobre mim',
        completion_date: new Date(),
        thumbnail_url: 'https://img.ur/OkspmS.png',
        status: ProjectStatus.Completed,
        github_url: 'https://github.com/felipesilva15',
        url: 'https://portfolio.felipesilva15.com.br',
        project_type: undefined,
        tags: [],
        technologies: [],
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (projects: Project[]) => {
        expect(projects).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
