import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoCardComponent } from './user-info-card.component';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/user.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserInfoCardComponent', () => {
  let component: UserInfoCardComponent;
  let fixture: ComponentFixture<UserInfoCardComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  const dummyUser: User = { 
    id: 1,
    name: 'Felipe Silva',
    email: 'felipe@gmail.com',
    job_title: 'Software developer',
    avatar_url: 'https://img.ur/sSkldjJ.png',
    phone_number: '11985682238',
    birth_date: new Date('2003-08-15T03:00:00.000-03:00'),
    locality: 'São Paulo, SP',
    about: '<p>Texto sobre mim</p>',
    links: [
      {
        id: 1,
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/felipe-silva1508/',
        icon_name: 'pi-linkedin',
        user_id: 1
      },
      {
        id: 1,
        label: 'Github',
        url: 'pi-github',
        icon_name: 'https://github.com/felipesilva15',
        user_id: 1
      }
    ],
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getById']);
    mockUserService.getById.and.returnValue(of(dummyUser));

    await TestBed.configureTestingModule({
      imports: [UserInfoCardComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoCardComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

   it('should set loading before ngOnInit', () => {
    expect(component.isLoading()).toBeTrue();
    expect(component.user).not.toBe(dummyUser);
  });

  it('should call the service and set data on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockUserService.getById).toHaveBeenCalledTimes(1);
    expect(component.user).toBe(dummyUser);
    expect(component.isLoading()).toBeFalse();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const iconBoxElement = fixture.debugElement.query(By.css('app-icon-box'));
    const dividerElement = fixture.debugElement.query(By.css('p-divider'));
    const tagElement = fixture.debugElement.query(By.css('p-tag'));
    const buttonElement = fixture.debugElement.query(By.css('p-button'));

    expect(iconBoxElement).toBeTruthy();
    expect(dividerElement).toBeTruthy();
    expect(tagElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  it('should invert the expandMoreInfo property when calling the toogleExpandMoreInfo method', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.expandMoreInfo.set(false);
    
    component.toogleExpandMoreInfo();
    expect(component.expandMoreInfo()).toBeTrue();

    component.toogleExpandMoreInfo();
    expect(component.expandMoreInfo()).toBeFalse();
  });

  it('should set the windowWidth when windown are resized', async() => {
    fixture.detectChanges();
    await fixture.whenStable();

    const newWidth = 1024;
    const resizeEvent = new Event('resize');

    Object.defineProperty(window, 'innerWidth', { 
      writable: true, 
      configurable: true, 
      value: newWidth
    });

    window.dispatchEvent(resizeEvent);

    expect(component.windowWidth()).toBe(newWidth);
  })
});
