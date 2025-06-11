import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Testimonial } from '../../../models/testimonial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private readonly baseUrl = environment.baseUrlApi + '/testimonial';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}`);
  }
}
