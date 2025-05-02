import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';



@NgModule({
  declarations: [
    TitleComponent,
    IconBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleComponent,
    IconBoxComponent
  ]
})
export class SharedModule { }
