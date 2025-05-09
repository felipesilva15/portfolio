import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogSize } from '../enums/dialog-size';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {
  ref!: DynamicDialogRef;

  constructor(private dialogService: DialogService) { }

  message(message: string, title?: string): void  {
    title = title || 'Atenção';
    const data = {
      message: message
    };

    this.open(MessageDialogComponent, title, data);
  }

  open<T>(componentType: Type<any>, title?: string, data?: Object, size?: DialogSize): Promise<T> {
    this.ref = this.dialogService.open(componentType, {
      header: title,
      modal: true, 
      data: data,
      width: this.getWidthBySize(size),
      closable: true,
      contentStyle: { 
        overflow: 'auto' 
      },
      breakpoints: {
        '520px': '90vw'
      },
    });

    return new Promise<T>((resolve, reject) => {
      this.ref.onClose.subscribe({
        next: (response: T) => {
          resolve(response);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  private getWidthBySize(size?: DialogSize): string {
    let width: string;

    switch (size) {
      case 'lg':
        width = '1020px';
        break;

      case 'md':
        width = '840px';
        break;
    
      default:
        width = '460px';
        break;
    }

    return width;
  }
}
