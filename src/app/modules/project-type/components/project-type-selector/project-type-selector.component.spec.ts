import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeSelectorComponent } from './project-type-selector.component';
import { ProjectTypeService } from '../../services/project-type.service';
import { ProjectType } from '../../../../models/project-type.model';
import { of } from 'rxjs';
import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkeletonModule } from 'primeng/skeleton';

describe('ProjectTypeSelectorComponent', () => {
  let component: ProjectTypeSelectorComponent;
  let fixture: ComponentFixture<ProjectTypeSelectorComponent>;
  let mockProjectTypeService: jasmine.SpyObj<ProjectTypeService>;
  const dummyProjectType: ProjectType[] = [
    { id: 1, name: 'Frontend' },
    { id: 2, name: 'Backend' }
  ];

  beforeEach(async () => {
    mockProjectTypeService = jasmine.createSpyObj('ProjectTypeService', ['getAll']);
    mockProjectTypeService.getAll.and.returnValue(of(dummyProjectType));

    await TestBed.configureTestingModule({
      imports: [ProjectTypeSelectorComponent, SkeletonModule],
      providers: [
        { provide: ProjectTypeService, useValue: mockProjectTypeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading before ngOnInit', () => {
    expect(component.isLoading()).toBeTrue();
    expect(component.projectTypes).not.toBe(dummyProjectType);
  });

  it('should call the service and set data on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockProjectTypeService.getAll).toHaveBeenCalledTimes(1);
    expect(component.projectTypes).toBe(dummyProjectType);
    expect(component.projectTypes).toContain({ id: 0, name: 'Todos' })
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

  it('should set selectedProjectType and emit the value', async () => {
    fixture.detectChanges();

    const dummyProjectType: ProjectType = { id: 0, name: 'Todos' };
    let emmitedValue: ProjectType | undefined;
    component.selectProjectTypeEvent.subscribe({
      next: (selectedProjectType: ProjectType) => {
        emmitedValue = selectedProjectType;
      }
    });

    component.selectedProjectType.set(dummyProjectType);
    fixture.detectChanges();

    expect(component.selectedProjectType()).toEqual(dummyProjectType);
    expect(emmitedValue).toEqual(dummyProjectType);
  });
});
