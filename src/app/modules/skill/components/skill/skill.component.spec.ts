import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillComponent } from './skill.component';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../../../models/skill.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let mockSkillService: jasmine.SpyObj<SkillService>;
  const dummySkills: Skill[] = [
    { id: 1, title: 'Angular', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { id: 1, title: 'Laravel', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' }
  ];

  beforeEach(async () => {
    mockSkillService = jasmine.createSpyObj('SkillService', ['getAll']);
    mockSkillService.getAll.and.returnValue(of(dummySkills));

    await TestBed.configureTestingModule({
      imports: [SkillComponent],
      providers: [
        { provide: SkillService, useValue: mockSkillService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading before ngOnInit', () => {
    expect(component.isLoading()).toBeTrue();
    expect(component.skills).not.toBe(dummySkills);
  });

  it('should call the service and set data on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockSkillService.getAll).toHaveBeenCalledTimes(1);
    expect(component.skills).toBe(dummySkills);
  });

  it('should render skeleton elements when is loading', async () => {
    fixture.detectChanges();

    component.isLoading.set(true);

    fixture.detectChanges();
    await fixture.whenStable();

    const skeletonElement = fixture.debugElement.query(By.css('p-skeleton'));

    expect(component.isLoading()).toBeTrue();
    expect(skeletonElement).toBeTruthy();
  });

  it('should render the elements after the data is loaded', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const skeletonElement = fixture.debugElement.query(By.css('p-skeleton'));
    const iconBoxElement = fixture.debugElement.query(By.css('app-icon-box'));
    const imageBoxElementList = fixture.debugElement.queryAll(By.css('.image-box'));

    expect(component.isLoading()).toBeFalse();
    expect(skeletonElement).not.toBeTruthy();
    expect(iconBoxElement).toBeTruthy();
    expect(imageBoxElementList).toBeTruthy();
    expect(imageBoxElementList.length).toEqual(dummySkills.length);
  });
});
