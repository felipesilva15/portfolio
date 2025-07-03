import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialDetailsComponent } from './testimonial-details.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Testimonial } from '../../../../models/testimonial.model';
import { Sex } from '../../../../shared/enums/sex';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TestimonialDetailsComponent', () => {
  let component: TestimonialDetailsComponent;
  let fixture: ComponentFixture<TestimonialDetailsComponent>;
  let mockDialogRef: jasmine.SpyObj<DynamicDialogRef<TestimonialDetailsComponent>>;
  let mockDynamicDialogConfig: DynamicDialogConfig;
  const dummyTestimonial: Testimonial = {
    id: 1,
    user_id: 1,
    name: 'Felipe',
    sex: Sex.Male,
    date: new Date(),
    testimonial: 'Um breve testemunho'
  }

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    mockDynamicDialogConfig = {
      data: dummyTestimonial
    };

    await TestBed.configureTestingModule({
      imports: [TestimonialDetailsComponent],
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig},
        { provide: DynamicDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('set the properties from input data', async () => {
    await fixture.whenStable();

    expect(component.testimonial).toBe(mockDynamicDialogConfig.data);
  });

  it('elements should be render the correct info from properties', async () => {
    await fixture.whenStable();

    const dateElement: HTMLElement = fixture.debugElement.query(By.css('div > span')).nativeElement;
    const linkElement: HTMLElement = fixture.debugElement.query(By.css('a')).nativeElement;
    const textElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    
    expect(dateElement).toBeTruthy();
    expect(linkElement).toBeTruthy();
    expect(textElement).toBeTruthy();
    expect(textElement.textContent).toContain(component.testimonial.testimonial);
  });

  it('should call close method of DialogRef when call close method of component', async () => {
    await fixture.whenStable();

    component.close();

    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });
});
