import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectType } from '../../../models/project-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {
  private readonly baseUrl: string = environment.baseUrlApi + '/project-type';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(`${this.baseUrl}`);
  }
}
