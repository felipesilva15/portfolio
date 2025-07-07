import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';
import { By } from '@angular/platform-browser';
import { EducationService } from '../../services/education.service';
import { Education } from '../../../../models/education.model';
import { of } from 'rxjs';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let mockEducationService: jasmine.SpyObj<EducationService>;
  const dummyEducations: Education[] = [
    {
      id: 1,
      institution_name: 'Senac',
      degree: 'Sistemas para internet',
      locality: 'São Paulo, SP',
      start_date: new Date()
    }
  ];

  beforeEach(async () => {
    mockEducationService = jasmine.createSpyObj('EducationService', ['getAll']);
    mockEducationService.getAll.and.returnValue(of(dummyEducations));

    await TestBed.configureTestingModule({
      imports: [EducationComponent],
      providers: [
        { provide: EducationService, useValue: mockEducationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const iconBoxElement = fixture.debugElement.query(By.css('app-icon-box'));
    const educationListElement = fixture.debugElement.queryAll(By.css('app-education-list'));

    expect(iconBoxElement).toBeTruthy();
    expect(educationListElement).toBeTruthy();
  });
});
