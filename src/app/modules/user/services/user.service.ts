import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  getById(id: number): Observable<User> {
    const creationDate = new Date();

    const fakeUser: User = {
      id: 1,
      name: 'Felipe Silva',
      email: 'felipe.allware@gmail.com',
      job_title: 'Fullstack developer',
      avatar_url: '',
      phone_number: '11983432682',
      birth_date: new Date('2003-08-15T03:00:00.000000Z'),
      locality: 'São Paulo, SP',
      links: [
        {
          id: 1,
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/felipe-silva1508',
          icon_name: 'pi-linkedin',
          user_id: 1,
          created_at: creationDate,
          updated_at: creationDate
        },
        {
          id: 2,
          label: 'GitHub',
          url: 'https://github.com/felipesilva15',
          icon_name: 'pi-github',
          user_id: 1,
          created_at: creationDate,
          updated_at: creationDate
        },
        {
          id: 3,
          label: 'Instagram',
          url: 'https://www.instagram.com/felipe_of_silva/',
          icon_name: 'pi-instagram',
          user_id: 1,
          created_at: creationDate,
          updated_at: creationDate
        }
      ],
      created_at: creationDate,
      updated_at: creationDate
    }

    return of(fakeUser);
  }
}
