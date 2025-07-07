import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { By } from '@angular/platform-browser';
import { TitleComponent } from '../../shared/components/title/title.component';
import { of } from 'rxjs';
import { ProjectService } from '../../modules/project/services/project.service';
import { ProjectTypeService } from '../../modules/project-type/services/project-type.service';
import { DynamicDialogService } from '../../shared/services/dynamic-dialog.service';
import { ProjectType } from '../../models/project-type.model';
import { ProjectStatus } from '../../shared/enums/project-status';
import { Project } from '../../models/project.model';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockProjectTypeService: jasmine.SpyObj<ProjectTypeService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', ['getAll']);
    mockProjectTypeService = jasmine.createSpyObj('ProjectTypeService', ['getAll']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['open']);
    mockProjectService.getAll.and.returnValue(of([]));
    mockProjectTypeService.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PortfolioComponent],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: ProjectTypeService, useValue: mockProjectTypeService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
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
    expect(titelComponent.text).toBe('Portfólio');
  });

  it('should render the ProjectListComponent', () => {
    const projectListElement = fixture.debugElement.query(By.css('app-project-list'));
    expect(projectListElement).toBeTruthy();
  });
});
