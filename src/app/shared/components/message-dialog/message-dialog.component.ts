import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent implements OnInit {
  message!: string;
  instance!: DynamicDialogComponent;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.message = this.config?.data?.message;
  }

  close(): void {
    this.ref.close();
  }
}
