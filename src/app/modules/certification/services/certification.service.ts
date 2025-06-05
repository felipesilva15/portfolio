import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../../../models/certification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private readonly baseUrl: string = environment.baseUrlApi + '/certification';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.baseUrl}`);
  }
}
