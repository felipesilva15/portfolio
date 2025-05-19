import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [
    TagModule, 
    ButtonModule, 
    DividerModule, 
    PipesModule, 
    DatePipe, 
    SharedModule,
    CommonModule
  ],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})
export class UserInfoCardComponent implements OnInit {
  user!: User;
  expandMoreInfo: WritableSignal<boolean> = signal<boolean>(false);
  
  windowWidth: WritableSignal<number> = signal<number>(window.innerWidth)
  isLargeScreen: Signal<boolean> = computed(() => this.windowWidth() >= 1200);
  showMoreInfo: Signal<boolean> = computed(() => (!this.isLargeScreen() && this.expandMoreInfo()) || this.isLargeScreen());

  constructor(private userService: UserService) {
    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getById(1).subscribe({
      next: (res: User) => {
        this.user = res;
      }
    });
  }

  toogleExpandMoreInfo(): void {
    this.expandMoreInfo.update(value => !value);
  }
}
