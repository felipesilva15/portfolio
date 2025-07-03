import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsComponent } from './project-details.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Project } from '../../../../models/project.model';
import { ProjectStatus } from '../../../../shared/enums/project-status';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let mockDialogRef: jasmine.SpyObj<DynamicDialogRef<ProjectDetailsComponent>>;
  let mockDynamicDialogConfig: DynamicDialogConfig;
  const dummyProject: Project = {
    id: 1,
    title: 'Portfólio',
    description: 'Um projeto de portfólio',
    completion_date: new Date(),
    thumbnail_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
    status: ProjectStatus.Completed,
    github_url: 'https://github.com/felipesilva15',
    url: 'https://portfolio.felipesilva15.com.br',
    project_type: {
      id: 1,
      name: 'Frontend' 
    },
    tags: [
      { id: 0, name: 'PrimeNG' }
    ],
    technologies: [
      { id: 0, name: 'Angular' }
    ]
  }

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    mockDynamicDialogConfig = {
      data: dummyProject
    };

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent],
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig},
        { provide: DynamicDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('set the properties from input data', async () => {
    await fixture.whenStable();

    expect(component.project).toBe(mockDynamicDialogConfig.data);
  }); 

  it('should call close method of DialogRef when call close method of component', async () => {
    await fixture.whenStable();

    component.close();

    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });
});
