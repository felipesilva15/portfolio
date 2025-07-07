import { TestBed } from '@angular/core/testing';

import { SkillService } from './skill.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Skill } from '../../../models/skill.model';

describe('SkillService', () => {
  let service: SkillService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/skill';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SkillService
      ]
    });

    service = TestBed.inject(SkillService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all skills from API with GET method', () => {
    const dummyData: Skill[] = [
      { 
        id: 1,
        title: 'Angular',
        icon_url: 'https://devicon.com/angular',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (skills: Skill[]) => {
        expect(skills).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
