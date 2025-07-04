import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { LayoutModule } from '../../layout.module';
import { UserService } from '../../../modules/user/services/user.service';
import { User } from '../../../models/user.model';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockActivatedRoute: any;
  const dummyUser: User = {
    id: 1,
    name: 'Felipe',
    email: 'felipe@gmail.com',
    job_title: 'Software developer',
    avatar_url: 'https://i.imgur.com/5eeXShJ.png',
    phone_number: '11986532407',
    birth_date: new Date(),
    locality: 'São Paulo, SP',
    about: 'Um texto sobre mim',
    links: []
  };

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getById']);
    mockUserService.getById.and.returnValue(of(dummyUser));
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => '1' })
    };

    await TestBed.configureTestingModule({
      imports: [LayoutModule],
      declarations: [LayoutComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components', () => {
    const userInfoCardComponentElement = fixture.debugElement.query(By.css('app-user-info-card'));
    const navbarComponentElement = fixture.debugElement.query(By.css('app-navbar'));
    const routerOutletElement = fixture.debugElement.query(By.css('router-outlet'));

    expect(userInfoCardComponentElement).toBeTruthy();
    expect(navbarComponentElement).toBeTruthy();
    expect(routerOutletElement).toBeTruthy();
  });
});
