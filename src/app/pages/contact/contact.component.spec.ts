import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ContactService } from '../../modules/contact/services/contact.service';
import { DynamicDialogService } from '../../shared/services/dynamic-dialog.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;

  beforeEach(async () => {
    mockContactService = jasmine.createSpyObj('ContactService', ['create']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['message']);

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
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
    expect(titelComponent.text).toBe('Contato');
  });

  it('should render the ContactFormComponent', () => {
    const contactFormComponentElement = fixture.debugElement.query(By.css('app-contact-form'));
    expect(contactFormComponentElement).toBeTruthy();
  });
});
