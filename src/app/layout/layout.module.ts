import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { UserInfoCardComponent } from '../modules/user/components/user-info-card/user-info-card.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    UserInfoCardComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
