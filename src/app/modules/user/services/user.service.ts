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
      avatar_url: 'https://i.imgur.com/5eeXShJ.png',
      phone_number: '11983432682',
      birth_date: new Date('2003-08-15T03:00:00.000000Z'),
      locality: 'São Paulo, SP',
      about: `<p>Olá! Me chamo Felipe Silva e sou desenvolvedor full-stack com experiência no desenvolvimento e análise de sistemas ERP, focado em otimizar processos empresariais e melhorar a eficiência operacional por meio de soluções escaláveis.</p><p>Atuei em projetos que reduziram tempos de processamento, automatizaram fluxos de trabalho e aprimoraram a integração entre sistemas utilizando tecnologias como Node.js, Laravel, Angular, SQL Server e MySQL, atuação em projetos web e desktop, além de deploy em ambiente cloud.</p><p>Me destaco pela organização, adaptabilidade e comunicação, facilitando a colaboração em equipe e a entrega de resultados eficientes.</p>`,
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
