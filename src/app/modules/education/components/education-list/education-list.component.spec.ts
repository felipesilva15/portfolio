import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationListComponent } from './education-list.component';
import { EducationService } from '../../services/education.service';
import { Education } from '../../../../models/education.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EducationListComponent', () => {
  let component: EducationListComponent;
  let fixture: ComponentFixture<EducationListComponent>;
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
      imports: [EducationListComponent],
      providers: [
        { provide: EducationService, useValue: mockEducationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const timelineElement = fixture.debugElement.query(By.css('app-timeline'));

    expect(timelineElement).toBeTruthy();
  });

  it('should call the service, set data, sort and make timeline list on init', async () => {
    const spySortEducations = jasmine.createSpy('sortEducations');
    const spyMakeTimelineList = jasmine.createSpy('makeTimelineList');
    component.sortEducations = spySortEducations;
    component.makeTimelineList = spyMakeTimelineList;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockEducationService.getAll).toHaveBeenCalledTimes(1);
    expect(component.educations).toBe(dummyEducations);
    expect(component.sortEducations).toHaveBeenCalledTimes(1);
    expect(component.makeTimelineList).toHaveBeenCalledTimes(1);
  });

  it('should sort the educations correctly', async () => {
    const dummyData: Education[] = [
      {
        id: 1,
        institution_name: 'Senac',
        degree: 'Sistemas para internet',
        locality: 'São Paulo, SP',
        start_date: new Date('2024-01-01T03:00:00.000-03:00'),
        end_date: new Date('2025-01-01T03:00:00.000-03:00'),
      },
      {
        id: 2,
        institution_name: 'Senac',
        degree: 'Sistemas para internet',
        locality: 'São Paulo, SP',
        start_date: new Date('2025-01-02T03:00:00.000-03:00'),
        end_date: undefined
      },
    ]
    mockEducationService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.sortEducations();

    expect(component.educations[0].id).toEqual(2);
    expect(component.educations[1].id).toEqual(1);
  });

  it('should make the timelist correctly', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    component.makeTimelineList();

    expect(component.timelineList.length).toEqual(component.educations.length);
    expect(component.timelineList[0].title).not.toEqual('');
    expect(component.timelineList[0].subtitle).not.toEqual('');
    expect(component.timelineList[0].description).not.toEqual('');
  });
});
