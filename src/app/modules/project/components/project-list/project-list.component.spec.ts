import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../services/project.service';
import { of } from 'rxjs';
import { Project } from '../../../../models/project.model';
import { ProjectStatus } from '../../../../shared/enums/project-status';
import { ProjectTypeService } from '../../../project-type/services/project-type.service';
import { ProjectType } from '../../../../models/project-type.model';
import { By } from '@angular/platform-browser';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockProjectTypeService: jasmine.SpyObj<ProjectTypeService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;
  const dummyProjects: Project[] = [
    {
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
  ];
  const dummyProjectTypes: ProjectType[] = [
    { id: 1, name: 'Frontend' },
    { id: 2, name: 'Backend' }
  ];

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', ['getAll']);
    mockProjectTypeService = jasmine.createSpyObj('ProjectTypeService', ['getAll']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['open']);
    mockProjectService.getAll.and.returnValue(of(dummyProjects));
    mockProjectTypeService.getAll.and.returnValue(of(dummyProjectTypes));

    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: ProjectTypeService, useValue: mockProjectTypeService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading before ngOnInit', () => {
    expect(component.isLoading()).toBeTrue();
    expect(component.projects).not.toBe(dummyProjects);
  });

  it('should call the service and set data on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockProjectService.getAll).toHaveBeenCalledTimes(1);
    expect(component.projects).toBe(dummyProjects);
    expect(component.isLoading()).toBeFalse();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const projectTypeSelectorElement = fixture.debugElement.query(By.css('app-project-type-selector'));
    const projecCardElement = fixture.debugElement.query(By.css('app-project-card'));

    expect(projectTypeSelectorElement).toBeTruthy();
    expect(projecCardElement).toBeTruthy();
  });

  it('should call the service, set data and sort on init', async () => {
    const spySortProjects = jasmine.createSpy('sortProjects');
    component.sortProjects = spySortProjects;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockProjectService.getAll).toHaveBeenCalledTimes(1);
    expect(component.projects).toBe(dummyProjects);
    expect(component.sortProjects).toHaveBeenCalledTimes(1);
    expect(component.filteredProjects).toBe(component.projects);
  });

  it('should sort the projects correctly', async () => {
    const dummyData: Project[] = [
      {
        id: 1,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-01-01T03:00:00.000-03:00'),
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
      },
      {
        id: 2,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-02-01T03:00:00.000-03:00'),
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
    ]
    mockProjectService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.sortProjects();

    expect(component.projects[0].id).toEqual(2);
    expect(component.projects[1].id).toEqual(1);
  });

  it('should filter the projects correctly when project type is inputed', async () => {
    const dummyData: Project[] = [
      {
        id: 1,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-01-01T03:00:00.000-03:00'),
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
      },
      {
        id: 2,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-02-01T03:00:00.000-03:00'),
        thumbnail_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
        status: ProjectStatus.Completed,
        github_url: 'https://github.com/felipesilva15',
        url: 'https://portfolio.felipesilva15.com.br',
        project_type: {
          id: 2,
          name: 'Backend' 
        },
        tags: [
          { id: 0, name: 'PrimeNG' }
        ],
        technologies: [
          { id: 0, name: 'Angular' }
        ]
      }
    ]
    const dummyProjectType: ProjectType = {
      id: 1,
      name: 'Frontend' 
    }

    mockProjectService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    const inittialProjectsLength: number = component.projects.length;

    component.filterProjectType(dummyProjectType);

    expect(component.projects.length).toEqual(inittialProjectsLength);
    expect(component.filteredProjects.length).toEqual(1);
    expect(component.filteredProjects[0].project_type).toEqual(dummyProjectType);
  });

  it('should filter the projects correctly when project type is not inputed', async () => {
    const dummyData: Project[] = [
      {
        id: 1,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-01-01T03:00:00.000-03:00'),
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
      },
      {
        id: 2,
        title: 'Portfólio',
        description: 'Um projeto de portfólio',
        completion_date: new Date('2025-02-01T03:00:00.000-03:00'),
        thumbnail_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
        status: ProjectStatus.Completed,
        github_url: 'https://github.com/felipesilva15',
        url: 'https://portfolio.felipesilva15.com.br',
        project_type: {
          id: 2,
          name: 'Backend' 
        },
        tags: [
          { id: 0, name: 'PrimeNG' }
        ],
        technologies: [
          { id: 0, name: 'Angular' }
        ]
      }
    ]
    mockProjectService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    const inittialProjectsLength: number = component.projects.length;

    component.filterProjectType();

    expect(component.projects.length).toEqual(inittialProjectsLength);
    expect(component.filteredProjects.length).toEqual(component.projects.length);
  });
});
