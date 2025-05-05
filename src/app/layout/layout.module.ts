import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserInfoCardComponent } from '../modules/user/components/user-info-card/user-info-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UserInfoCardComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
