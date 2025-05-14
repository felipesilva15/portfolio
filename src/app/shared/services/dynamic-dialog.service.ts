import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogSize } from '../enums/dialog-size';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { DynamicDialogConfig } from '../../models/dynamic-dialog-config.data';

type DialogBeakpoints = Record<string, any>;

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

    this.open(MessageDialogComponent, {
      title: title,
      data: data,
      closeable: true
    });
  }

  open<T>(componentType: Type<any>, config: DynamicDialogConfig): Promise<T> {
    const width: string = this.getWidthBySize(config.size);

    this.ref = this.dialogService.open(componentType, {
      header: config.title,
      modal: true, 
      data: config.data,
      width: width,
      closable: config.closeable,
      styleClass: config.styleClass,
      contentStyle: { 
        overflow: 'auto' 
      },
      breakpoints: this.getBreakpointsByWidth(width)
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
        width = '500px';
        break;
    }

    return width;
  }

  private getBreakpointsByWidth(width: string): DialogBeakpoints {
    const margin: string = '5vw';
    const breakpointName: string = `calc(${width} + ${margin})`;

    const breakpoints: DialogBeakpoints = {};
    breakpoints[breakpointName] = '95vw';

    return breakpoints;
  }
}
