import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { Contact } from '../../../models/contact.model';
import { ContactStatus } from '../../../shared/enums/contact-status';

describe('ContactService', () => {
  let service: ContactService;
  let httpTesting: HttpTestingController;
  const baseUrlApi: string = environment.baseUrlApi + '/contact';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactService
      ]
    });

    service = TestBed.inject(ContactService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new contact on API with POST method', () => {
    const newContact: Contact = {
      name: 'Felipe',
      email: 'felipe@email.com.br',
      subject: 'Contato',
      message: 'Um novo contato',
      status: ContactStatus.Pending
    };
    const responseContact: Contact = { 
      id: 1, 
      created_at: new Date(), 
      updated_at: new Date(), 
      ...newContact 
    };

    service.create(newContact).subscribe({
      next: (contact: Contact) => {
        expect(contact).toEqual(responseContact);
      }
    });

    const req = httpTesting.expectOne(baseUrlApi);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(newContact);

    req.flush(responseContact);
  });
});

