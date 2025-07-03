import { TestBed } from '@angular/core/testing';

import { DynamicDialogService } from './dynamic-dialog.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { DynamicDialogConfig } from '../../models/dynamic-dialog-config.data';
import { DialogSize } from '../enums/dialog-size';
import { Subject } from 'rxjs';

class DummyComponent {}

describe('DynamicDialogService', () => {
  let service: DynamicDialogService;
  let mockPrimengDialogService: jasmine.SpyObj<DialogService>;
  let mockDialogRef: jasmine.SpyObj<DynamicDialogRef>;
  let onCloseSubject: Subject<any>;

  beforeEach(() => {
    mockPrimengDialogService = jasmine.createSpyObj('DialogService', ['open']);
    onCloseSubject = new Subject<any>();
    mockDialogRef = jasmine.createSpyObj('DynamicDialogRef', ['onClose']);
    mockDialogRef.onClose = onCloseSubject.asObservable();

    mockPrimengDialogService.open.and.returnValue(mockDialogRef);

    TestBed.configureTestingModule({
      providers: [
        DynamicDialogService,
        { provide: DialogService, useValue: mockPrimengDialogService }
      ]
    });

    service = TestBed.inject(DynamicDialogService);
  });

  it('shoud be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the "open" method of the DialogService when opening a message dialog', () => {
    mockPrimengDialogService.open.and.returnValue(mockDialogRef);

    const message: string = 'Ocorreu um problema!';
    const title: string = 'Atenção';
    
    service.message(message, title);

    expect(mockPrimengDialogService.open).toHaveBeenCalledWith(
      MessageDialogComponent,
      jasmine.objectContaining({
        data: { 
          message: message
        },
        header: title
      })
    );
  });

  it('must call the open method of the PrimeNG DialogService with the correct parameters', () => {
    const config: DynamicDialogConfig = {
      title: 'Dummy',
      data: { 
        id: 1,
        name: 'Exemplo'
      },
      closeable: true,
      styleClass: 'custom-modal-class',
      size: DialogSize.Large
    };

    service.open(DummyComponent, config);

    expect(mockPrimengDialogService.open).toHaveBeenCalledWith(
      DummyComponent,
      jasmine.objectContaining({
        header: config.title,
        modal: true,
        data: config.data,
        closable: config.closeable,
        styleClass: config.styleClass
      })
    );
  });

  it('must resolve the Promise with the value emitted by onClose', async () => {
    const config: DynamicDialogConfig = {
      title: 'Dummy',
      size: DialogSize.Medium
    };
    const expectedResult = {
      status: 'success',
      message: 'Dados do modal'
    };

    const dialogPromise = service.open(DummyComponent, config);

    onCloseSubject.next(expectedResult);
    onCloseSubject.complete();

    await expectAsync(dialogPromise).toBeResolvedTo(expectedResult);
  });

  it('should reject the Promise with the error thrown by onClose', async () => {
    const config: DynamicDialogConfig = {
      title: 'Dummy',
      size: DialogSize.Small
    };
    const expectedError = new Error('Erro ao fechar o modal');

    const dialogPromise = service.open(DummyComponent, config);

    onCloseSubject.error(expectedError);

    await expectAsync(dialogPromise).toBeRejectedWith(expectedError);
  });
});
