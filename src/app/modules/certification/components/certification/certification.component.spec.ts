import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationComponent } from './certification.component';
import { of } from 'rxjs';
import { Certification } from '../../../../models/certification.model';
import { CertificationService } from '../../services/certification.service';
import { By } from '@angular/platform-browser';

describe('CertificationComponent', () => {
  let component: CertificationComponent;
  let fixture: ComponentFixture<CertificationComponent>;
  let mockCertificationService: jasmine.SpyObj<CertificationService>;
  const dummyCertifications: Certification[] = [
    {
      id: 0,
      title: 'Angular',
      institution_name: 'Udemy',
      issued_date: new Date(),
      credential_id: '328e4095-ca42-419d-b215-5ea5872303d8',
      credential_url: 'https://ude.my/328e4095-ca42-419d-b215-5ea5872303d8'
    }
  ];

  beforeEach(async () => {
    mockCertificationService = jasmine.createSpyObj('CertificationService', ['getAll']);
    mockCertificationService.getAll.and.returnValue(of(dummyCertifications));

    await TestBed.configureTestingModule({
      imports: [CertificationComponent],
      providers: [
        { provide: CertificationService, useValue: mockCertificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationComponent);
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
    const spySortCertifications = jasmine.createSpy('sortCertifications');
    const spyMakeTimelineList = jasmine.createSpy('makeTimelineList');
    component.sortCertifications = spySortCertifications;
    component.makeTimelineList = spyMakeTimelineList;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockCertificationService.getAll).toHaveBeenCalledTimes(1);
    expect(component.certifications).toBe(dummyCertifications);
    expect(component.sortCertifications).toHaveBeenCalledTimes(1);
    expect(component.makeTimelineList).toHaveBeenCalledTimes(1);
  });

  it('should sort the certifications correctly', async () => {
    const dummyData: Certification[] = [
      {
        id: 1,
        title: 'Angular',
        institution_name: 'Udemy',
        issued_date: new Date('2025-01-01T03:00:00.000-03:00'),
        credential_id: '328e4095-ca42-419d-b215-5ea5872303d8',
        credential_url: 'https://ude.my/328e4095-ca42-419d-b215-5ea5872303d8'
      },
      {
        id: 2,
        title: 'Angular',
        institution_name: 'Udemy',
        issued_date: new Date('2025-01-02T03:00:00.000-03:00'),
        credential_id: '328e4095-ca42-419d-b215-5ea5872303d8',
        credential_url: 'https://ude.my/328e4095-ca42-419d-b215-5ea5872303d8'
      }
    ]
    mockCertificationService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.sortCertifications();

    expect(component.certifications[0].id).toEqual(2);
    expect(component.certifications[1].id).toEqual(1);
  });

  it('should make the timelist correctly', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    component.makeTimelineList();

    expect(component.timelineList.length).toEqual(component.certifications.length);
    expect(component.timelineList[0].title).not.toEqual('');
    expect(component.timelineList[0].subtitle).not.toEqual('');
    expect(component.timelineList[0].description).not.toEqual('');
  });
});
