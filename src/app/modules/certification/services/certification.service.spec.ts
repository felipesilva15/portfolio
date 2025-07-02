import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CertificationService } from './certification.service';
import { provideHttpClient } from '@angular/common/http';
import { Certification } from '../../../models/certification.model';
import { environment } from '../../../../environments/environment';

describe('CertificationService', () => {
  let service: CertificationService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/certification';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CertificationService
      ]
    });

    service = TestBed.inject(CertificationService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all certifications from API with GET method', () => {
    const dummyData: Certification[] = [
      { 
        id: 1,
        title: 'Angular v19+',
        institution_name: 'Udemy',
        issued_date: new Date(),
        expiration_date: new Date(),
        credential_id: 'id-000001',
        credential_url: 'https://udemy.url.certificado',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    service.getAll().subscribe({
      next: (certifications: Certification[]) => {
        expect(certifications).toEqual(dummyData);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });
});
