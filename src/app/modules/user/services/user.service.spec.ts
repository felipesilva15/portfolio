import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserService
      ]
    });

    service = TestBed.inject(UserService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get one user filtering by ID from API with GET method', () => {
    const dummyData: User = { 
      id: 1,
      name: 'Felipe Silva',
      email: 'felipe@gmail.com',
      job_title: 'Software developer',
      avatar_url: 'https://img.ur/sSkldjJ.png',
      phone_number: '11985682238',
      birth_date: new Date(),
      locality: 'São Paulo, SP',
      about: '<p>Texto sobre mim</p>',
      links: [],
      created_at: new Date(),
      updated_at: new Date()
    };

    service.getById(dummyData.id).subscribe({
      next: (user: User) => {
        expect(user).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(`${baseUrlApi}/${dummyData.id}`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
