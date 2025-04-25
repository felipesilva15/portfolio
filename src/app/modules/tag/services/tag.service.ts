import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../../models/tag.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly baseUrl: string = environment.baseUrlApi + '/tag';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}`);
  }
}
