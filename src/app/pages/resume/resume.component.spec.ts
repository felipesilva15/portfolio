import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';
import { EducationService } from '../../modules/education/services/education.service';
import { ExperienceService } from '../../modules/experience/services/experience.service';
import { SkillService } from '../../modules/skill/services/skill.service';
import { CertificationService } from '../../modules/certification/services/certification.service';
import { of } from 'rxjs';
import { TitleComponent } from '../../shared/components/title/title.component';
import { By } from '@angular/platform-browser';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
  let mockEducationService: jasmine.SpyObj<EducationService>;
  let mockExperienceService: jasmine.SpyObj<ExperienceService>;
  let mockSkillService: jasmine.SpyObj<SkillService>;
  let mockCertificationService: jasmine.SpyObj<CertificationService>;

  beforeEach(async () => {
    mockEducationService = jasmine.createSpyObj('EducationService', ['getAll']);
    mockExperienceService = jasmine.createSpyObj('ExperienceService', ['getAll']);
    mockSkillService = jasmine.createSpyObj('SkillService', ['getAll']);
    mockCertificationService = jasmine.createSpyObj('CertificationService', ['getAll']);
    mockEducationService.getAll.and.returnValue(of([]));
    mockExperienceService.getAll.and.returnValue(of([]));
    mockSkillService.getAll.and.returnValue(of([]));
    mockCertificationService.getAll.and.returnValue(of([]));
    
    await TestBed.configureTestingModule({
      imports: [ResumeComponent],
      providers: [
        { provide: EducationService, useValue: mockEducationService },
        { provide: ExperienceService, useValue: mockExperienceService },
        { provide: SkillService, useValue: mockSkillService },
        { provide: CertificationService, useValue: mockCertificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the TitleComponent', () => {
    const titleComponentElement = fixture.debugElement.query(By.css('app-title'));
    expect(titleComponentElement).toBeTruthy();

    const titelComponent = titleComponentElement.componentInstance as TitleComponent;
    expect(titelComponent.text).toBe('Currículo');
  });

  it('should render the EducationComponent', () => {
    const educationElement = fixture.debugElement.query(By.css('app-education'));
    expect(educationElement).toBeTruthy();
  });

  it('should render the ExperienceComponent', () => {
    const experienceElement = fixture.debugElement.query(By.css('app-experience'));
    expect(experienceElement).toBeTruthy();
  });

  it('should render the CertificationComponent', () => {
    const certificationElement = fixture.debugElement.query(By.css('app-certification'));
    expect(certificationElement).toBeTruthy();
  });

  it('should render the SkillComponent', () => {
    const skillElement = fixture.debugElement.query(By.css('app-skill'));
    expect(skillElement).toBeTruthy();
  });
});
