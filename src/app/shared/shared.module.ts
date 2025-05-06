import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { TimelineComponent } from './components/timeline/timeline.component';



@NgModule({
  declarations: [
    TitleComponent,
    IconBoxComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleComponent,
    IconBoxComponent,
    TimelineComponent
  ]
})
export class SharedModule { }
