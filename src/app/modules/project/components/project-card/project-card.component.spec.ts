import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';
import { Project } from '../../../../models/project.model';
import { ProjectStatus } from '../../../../shared/enums/project-status';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;
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
        { id: 1, name: 'PrimeNG' }
      ],
      technologies: [
        { id: 1, name: 'Angular' }
      ]
    }

  beforeEach(async () => {
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['open']);

    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = dummyProject;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call the "open" method of the DynamicDialogService when showing details', () => {
    component.openDetailsDialog(component.project);

    expect(mockDynamicDialogService.open).toHaveBeenCalledTimes(1);
  });

  it('should return the correct more tags text', () => {
    component.project.tags = [
      { id: 1, name: 'PrimeNG' },
      { id: 2, name: 'Taiwind CSS' },
      { id: 3, name: 'SASS' },
      { id: 4, name: 'Docker' },
      { id: 5, name: 'API' }
    ];
    component.maxTags = 3;
    const moreTagsText = component.moreTagsText();

    expect(moreTagsText).toEqual('+2');
  });
});
