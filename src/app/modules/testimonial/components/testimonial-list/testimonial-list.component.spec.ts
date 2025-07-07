import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialListComponent } from './testimonial-list.component';
import { of } from 'rxjs';
import { TestimonialService } from '../../services/testimonial.service';
import { Testimonial } from '../../../../models/testimonial.model';
import { Sex } from '../../../../shared/enums/sex';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';
import { By } from '@angular/platform-browser';

describe('TestimonialListComponent', () => {
  let component: TestimonialListComponent;
  let fixture: ComponentFixture<TestimonialListComponent>;
  let mockTestimonialService: jasmine.SpyObj<TestimonialService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;
  const dummyTestimonials: Testimonial[] = [
    {
      id: 1,
      user_id: 1,
      name: 'José',
      sex: Sex.Male,
      date: new Date(),
      testimonial: 'Um breve testemunho.'
    },
    {
      id: 2,
      user_id: 1,
      name: 'Roberta',
      sex: Sex.Female,
      date: new Date(),
      testimonial: 'Um testemunho um pouco maior que o outro.'
    }
  ];

  beforeEach(async () => {
    mockTestimonialService = jasmine.createSpyObj('TestimonialService', ['getAll']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['open']);
    mockTestimonialService.getAll.and.returnValue(of(dummyTestimonials));
    
    await TestBed.configureTestingModule({
      imports: [TestimonialListComponent],
      providers: [
        { provide: TestimonialService, useValue: mockTestimonialService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading before ngOnInit', () => {
    expect(component.isLoading()).toBeTrue();
    expect(component.testimonials).not.toBe(dummyTestimonials);
  });

  it('should call the service and set data on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockTestimonialService.getAll).toHaveBeenCalledTimes(1);
    expect(component.testimonials).toBe(dummyTestimonials);
    expect(component.isLoading()).toBeFalse();
  });

  it('should call the service, set data, treat the texts and sort on init', async () => {
    const spySortTestimonials = jasmine.createSpy('sortTestimonials');
    const spyTreatTestimonialText = jasmine.createSpy('treatTestimonialText');
    component.sortTestimonials = spySortTestimonials;
    component.treatTestimonialText = spyTreatTestimonialText;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockTestimonialService.getAll).toHaveBeenCalledTimes(1);
    expect(component.testimonials).toBe(dummyTestimonials);
    expect(component.treatTestimonialText).toHaveBeenCalledTimes(1);
    expect(component.sortTestimonials).toHaveBeenCalledTimes(1);
  });

  it('should sort the testimonials correctly', async () => {
    const dummyData: Testimonial[] = [
      {
        id: 1,
        user_id: 1,
        name: 'José',
        sex: Sex.Male,
        date: new Date('2025-01-01T03:00:00.000-03:00'),
        testimonial: 'Um breve testemunho.'
      },
      {
        id: 2,
        user_id: 1,
        name: 'Roberta',
        sex: Sex.Female,
        date: new Date('2025-02-01T03:00:00.000-03:00'),
        testimonial: 'Um testemunho um pouco maior que o outro.'
      }
    ]
    mockTestimonialService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.sortTestimonials();

    expect(component.testimonials[0].id).toEqual(2);
    expect(component.testimonials[1].id).toEqual(1);
  });
  
  it('should call the DynamicDialogService when showDetails is called', async () => {
    const dummyTestimonial: Testimonial = {
      id: 1,
      user_id: 1,
      name: 'José',
      sex: Sex.Male,
      date: new Date('2025-01-01T03:00:00.000-03:00'),
      testimonial: 'Um breve testemunho.'
    }

    fixture.detectChanges();
    await fixture.whenStable();

    component.showDetails(dummyTestimonial);

    expect(mockDynamicDialogService.open).toHaveBeenCalledTimes(1);
  });

  it('should add <br> tag to text and remove the especial JSON caracteres', async () => {
    const dummyData: Testimonial[] =[
        {
        id: 1,
        user_id: 1,
        name: 'José',
        sex: Sex.Male,
        date: new Date('2025-01-01T03:00:00.000-03:00'),
        testimonial: 'Um breve testemunho. \r\r Aqui está alguns enters para quebra de linhas.'
      }
    ];
    mockTestimonialService.getAll.and.returnValue(of(dummyData));

    fixture.detectChanges();
    await fixture.whenStable();

    component.treatTestimonialText();

    const brTagCount: number = (component.testimonials[0].testimonial.match(/<br>/g) || []).length

    expect(component.testimonials[0].testimonial).toContain('<br>');
    expect(brTagCount).toBe(2);
    expect(component.testimonials[0].testimonial).not.toContain('\r');
  });
});
