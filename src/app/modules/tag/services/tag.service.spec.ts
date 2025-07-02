import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Tag } from '../../../models/tag.model';

describe('TagService', () => {
  let service: TagService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/tag';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TagService
      ]
    });

    service = TestBed.inject(TagService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tags from API with GET method', () => {
    const dummyData: Tag[] = [
      { 
        id: 1,
        name: 'PrimeNG',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    service.getAll().subscribe({
      next: (tags: Tag[]) => {
        expect(tags).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
