import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Education } from '../../../models/education.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private readonly baseUrl: string = environment.baseUrlApi + '/education';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}`);
  }
}
