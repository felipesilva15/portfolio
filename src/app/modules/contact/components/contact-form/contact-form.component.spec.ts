import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../../../models/contact.model';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';
import { MessageService } from 'primeng/api';
import { ContactStatus } from '../../../../shared/enums/contact-status';
import { of, throwError } from 'rxjs';
import { ApiError } from '../../../../models/api-error.data';
import { By } from '@angular/platform-browser';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;
  let mockDynamicDialogService: jasmine.SpyObj<DynamicDialogService>;
  let mockMessageService: jasmine.SpyObj<MessageService>
  const dummyContact: Contact = {
    id: 1,
    name: 'Felipe',
    email: 'felipe@gmail.com',
    subject: 'Novo contato',
    message: '<p>Um contato a ser registrado</p>',
    status: ContactStatus.Pending,
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    mockContactService = jasmine.createSpyObj('ContactService', ['create']);
    mockDynamicDialogService = jasmine.createSpyObj('DynamicDialogService', ['message']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add'])
    mockContactService.create.and.returnValue(of(dummyContact));

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: DynamicDialogService, useValue: mockDynamicDialogService },
        { provide: MessageService, useValue: mockMessageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set the contactForm on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.contactForm).toBeTruthy();
    expect(component.name).not.toBeNull();
    expect(component.email).not.toBeNull();
    expect(component.subject).not.toBeNull();
    expect(component.message).not.toBeNull();
  });

  it('should parse the form to model correctly', async () => {
    const dummyData: Contact = {
      name: 'Felipe Silva',
      email: 'felipe.silva@gmail.com',
      subject: 'Contato',
      message: '<p>Um novo contato.</p>',
      status: ContactStatus.Pending
    };

    fixture.detectChanges();
    await fixture.whenStable();

    component.contactForm.patchValue({
      name: dummyData.name,
      email: dummyData.email,
      subject: dummyData.subject,
      message: dummyData.message
    });

    component.parseFormToModel();

    expect(component.contact).toEqual(dummyData);
  });

  it('should mark all properties as touched and return boolean value when calling isValidForm method', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.contactForm.patchValue({
      name: 'Felipe',
    });

    const isValidForm = component.isValidForm();
    expect(isValidForm).toBeFalse();

    expect(component.name?.touched).toBeTrue();
    expect(component.email?.touched).toBeTrue();
    expect(component.subject?.touched).toBeTrue();
    expect(component.message?.touched).toBeTrue();

    expect(component.name?.invalid).toBeFalse();
    expect(component.email?.invalid).toBeTrue();
    expect(component.subject?.invalid).toBeTrue();
    expect(component.message?.invalid).toBeTrue();
  });

  it('should call the service API, show the toast message and clean the properties', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    spyOn(component, 'isValidForm').and.returnValue(true);
    spyOn(component, 'initBlankForm');

    component.contactForm.patchValue({
      name: dummyContact.name,
      email: dummyContact.email,
      subject: dummyContact.subject,
      message: dummyContact.message
    });

    component.onSubmit();

    expect(component.isValidForm).toHaveBeenCalledTimes(1);
    expect(mockContactService.create).toHaveBeenCalledWith(component.contact);
    expect(component.initBlankForm).toHaveBeenCalled();
  });

  it('should call the service API and show the error when the request failed', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const apiError: ApiError = { message: 'Dados inválidos!' };
    mockContactService.create.and.returnValue(throwError(() => ({ error: apiError })));
    spyOn(component, 'initBlankForm');

    component.contactForm.patchValue({
      name: dummyContact.name,
      email: dummyContact.email,
      subject: dummyContact.subject,
      message: dummyContact.message
    });

    component.onSubmit();

    expect(mockContactService.create).toHaveBeenCalledWith(component.contact);
    expect(component.initBlankForm).not.toHaveBeenCalled();
    expect(mockMessageService.add).not.toHaveBeenCalled();
    expect(mockDynamicDialogService.message).toHaveBeenCalledWith(apiError.message, 'Atenção');
  });

  it('should call the service API and show the unexpected error when the request failed', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    mockContactService.create.and.returnValue(throwError(() => ({})));
    spyOn(component, 'initBlankForm');

    component.contactForm.patchValue({
      name: dummyContact.name,
      email: dummyContact.email,
      subject: dummyContact.subject,
      message: dummyContact.message
    });

    component.onSubmit();

    expect(mockContactService.create).toHaveBeenCalledWith(component.contact);
    expect(component.initBlankForm).not.toHaveBeenCalled();
    expect(mockMessageService.add).not.toHaveBeenCalled();
    expect(mockDynamicDialogService.message).toHaveBeenCalledWith('Ocorreu um erro!', 'Atenção');
  });

  it('should not call the service API when calling onSubmitis invalid form ', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    spyOn(component, 'isValidForm').and.returnValue(false);

    component.onSubmit();

    expect(component.isValidForm).toHaveBeenCalled();
    expect(mockContactService.create).not.toHaveBeenCalled();
  });

  it('should disable or enable form when isSubmitting is updated', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.isSubmitting.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isDisabledForm()).toBeTrue();
    expect(component.contactForm.disabled).toBeTrue();

    component.isSubmitting.set(false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isDisabledForm()).toBeFalse();
    expect(component.contactForm.disabled).toBeFalse();
  });

  it('should render the child components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const fluidElement = fixture.debugElement.query(By.css('p-fluid'));
    const editorElement = fixture.debugElement.query(By.css('p-editor'));
    const buttonElement = fixture.debugElement.query(By.css('p-button'));
    const toastElement = fixture.debugElement.query(By.css('p-toast'));
    const inputTextElement = fixture.debugElement.query(By.css('input[pInputText]'));

    expect(fluidElement).toBeTruthy();
    expect(editorElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(toastElement).toBeTruthy();
    expect(inputTextElement).toBeTruthy();
  });
});
