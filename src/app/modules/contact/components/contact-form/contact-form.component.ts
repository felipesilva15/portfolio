import { Component, computed, effect, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../../../models/contact.model';
import { finalize } from 'rxjs';
import { DynamicDialogService } from '../../../../shared/services/dynamic-dialog.service';
import { ApiError } from '../../../../models/api-error.data';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactStatus } from '../../../../shared/enums/contact-status';
import { SharedModule } from "../../../../shared/shared.module";
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { EditorModule } from 'primeng/editor';

interface ContactForm {
  name: FormControl<string>,
  email: FormControl<string>,
  subject: FormControl<string>,
  message: FormControl<string>
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    Toast, 
    ReactiveFormsModule, 
    SharedModule, 
    InputTextModule, 
    CommonModule, 
    FormsModule,
    ButtonModule,
    FluidModule,
    EditorModule
  ],
  providers: [MessageService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  isSubmitting: WritableSignal<boolean> = signal<boolean>(false);
  isDisabledForm: Signal<boolean> = computed(() => {
    return this.isSubmitting();
  });
  contactForm!: FormGroup<ContactForm>
  contact!: Contact;

  constructor(private contactService: ContactService, private dynamicDialogService: DynamicDialogService, private messageService: MessageService, private fb: FormBuilder) {
    effect(() => {
      if(this.isDisabledForm()) {
        this.contactForm?.disable();
      } else {
        this.contactForm?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.initBlankForm();
  }

  initBlankForm(): void {
    this.contactForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(255)]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      message: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get name(): AbstractControl | null {
    return this.contactForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get subject(): AbstractControl | null {
    return this.contactForm.get('subject');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }

  parseFormToModel(): void {
    const model: Contact = {
      name: this.name?.value,
      email: this.email?.value,
      subject: this.subject?.value,
      message: this.message?.value,
      status: ContactStatus.Pending 
    };

    this.contact = model;
  }

  isValidForm(): boolean {
    this.contactForm.markAllAsTouched();
    return this.contactForm.valid;
  }

  onSubmit(): void {
    if(!this.isValidForm()) {
      return;
    }

    this.isSubmitting.set(true);
    this.parseFormToModel();

    this.contactService.create(this.contact)
      .pipe(
        finalize(() => this.isSubmitting.set(false))
      ).subscribe({
        next: () => {
          this.initBlankForm();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Muito obrigado! Seu contato foi registrado com sucesso.',
            life: 4000
          });
        },
        error: (err: any) => {
          const apiError: ApiError = err.error;
          this.dynamicDialogService.message(apiError?.message || 'Ocorreu um erro!', 'Atenção');
        }
      });
  }
}
