import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Experience } from '../../../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly baseUrl: string = environment.baseUrlApi + '/experience';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.baseUrl}`);
  }
}
