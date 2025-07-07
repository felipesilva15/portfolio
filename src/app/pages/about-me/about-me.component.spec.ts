import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';
import { of } from 'rxjs';
import { TestimonialService } from '../../modules/testimonial/services/testimonial.service';
import { DynamicDialogService } from '../../shared/services/dynamic-dialog.service';
import { Testimonial } from '../../models/testimonial.model';
import { Sex } from '../../shared/enums/sex';
import { UserService } from '../../modules/user/services/user.service';
import { User } from '../../models/user.model';
import { By } from '@angular/platform-browser';
import { TitleComponent } from '../../shared/components/title/title.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockTestimonialService: jasmine.SpyObj<TestimonialService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;
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
  const dummyTestimonials: Testimonial[] = [
    {
      id: 1,
      user_id: 1,
      name: 'José',
      sex: Sex.Male,
      date: new Date(),
      testimonial: 'Um breve testemunho.'
    },
    {
      id: 2,
      user_id: 1,
      name: 'Roberta',
      sex: Sex.Female,
      date: new Date(),
      testimonial: 'Um testemunho um pouco maior que o outro.'
    }
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getById']);
    mockTestimonialService = jasmine.createSpyObj('TestimonialService', ['getAll']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['open']);
    mockUserService.getById.and.returnValue(of(dummyUser));
    mockTestimonialService.getAll.and.returnValue(of(dummyTestimonials));
    
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: TestimonialService, useValue: mockTestimonialService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
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

  it('should render the TitleComponent', () => {
    const titleElement = fixture.debugElement.query(By.css('app-title'));
    expect(titleElement).toBeTruthy();

    const titleComponent = titleElement.componentInstance as TitleComponent;
    expect(titleComponent.text).toBe('Sobre mim');
  });

  it('should render the TestimonialListComponent', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const testimonialListElement = fixture.debugElement.query(By.css('app-testimonial-list'));
    expect(testimonialListElement).toBeTruthy();
  });
});
