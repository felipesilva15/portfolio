import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    TitleComponent,
    IconBoxComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    ButtonModule
  ],
  exports: [
    TitleComponent,
    IconBoxComponent,
    TimelineComponent
  ]
})
export class SharedModule { }
