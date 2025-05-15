import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly baseUrl = environment.baseUrlApi + '/contact';

  constructor(private http: HttpClient) { }

  create(data: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}`, data);
  }
}
