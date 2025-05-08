import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Skill } from '../../../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private readonly baseUrl = environment.baseUrlApi + '/skill';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}`);
  }
}
