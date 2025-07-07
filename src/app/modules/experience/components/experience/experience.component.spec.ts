import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { ExperienceService } from '../../services/experience.service';
import { DateUtilsService } from '../../../../shared/utils/date-utils.service';
import { Experience } from '../../../../models/experience.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let mockExperienceService: jasmine.SpyObj<ExperienceService>;
  const dummyExperiences: Experience[] = [
    {
      id: 0,
      company_name: 'PWI',
      position: 'Software Developer',
      locality: 'São Paulo, SP',
      description: 'Atuei como desenvolvedor fullstack.',
      start_date: new Date()
    }
  ];

  beforeEach(async () => {
    mockExperienceService = jasmine.createSpyObj('ExperienceService', ['getAll']);
    mockExperienceService.getAll.and.returnValue(of(dummyExperiences));

    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [
        { provide: ExperienceService, useValue: mockExperienceService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const timelineElement = fixture.debugElement.query(By.css('app-timeline'));
    const iconBoxElement = fixture.debugElement.query(By.css('app-icon-box'));

    expect(timelineElement).toBeTruthy();
    expect(iconBoxElement).toBeTruthy();
  });

  it('should call the service, set data, sort and make timeline list on init', async () => {
    const spySortExperiences = jasmine.createSpy('sortExperiences');
    const spyMakeTimelineList = jasmine.createSpy('makeTimelineList');
    component.sortExperiences = spySortExperiences;
    component.makeTimelineList = spyMakeTimelineList;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockExperienceService.getAll).toHaveBeenCalledTimes(1);
    expect(component.experiences).toBe(dummyExperiences);
    expect(component.sortExperiences).toHaveBeenCalledTimes(1);
    expect(component.makeTimelineList).toHaveBeenCalledTimes(1);
  });

  it('should sort the experiences correctly', async () => {
    const dummyData: Experience[] = [
      {
        id: 1,
        company_name: 'PWI',
        position: 'Software Developer',
        locality: 'São Paulo, SP',
        description: 'Atuei como desenvolvedor fullstack.',
        start_date: new Date('2024-01-01T03:00:00.000-03:00'),
        end_date: new Date('2025-01-01T03:00:00.000-03:00'),
      },
      {
        id: 2,
        company_name: 'PWI',
        position: 'Software Developer',
        locality: 'São Paulo, SP',
        description: 'Atuei como desenvolvedor fullstack.',
        start_date: new Date('2025-01-02T03:00:00.000-03:00'),
        end_date: undefined
      }
    ]
    mockExperienceService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.sortExperiences();

    expect(component.experiences[0].id).toEqual(2);
    expect(component.experiences[1].id).toEqual(1);
  });

  it('should make the timelist correctly', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    component.makeTimelineList();

    expect(component.timelineList.length).toEqual(component.experiences.length);
    expect(component.timelineList[0].title).not.toEqual('');
    expect(component.timelineList[0].subtitle).not.toEqual('');
    expect(component.timelineList[0].description).not.toEqual('');
  });
});
