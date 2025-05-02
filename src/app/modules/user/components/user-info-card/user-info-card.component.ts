import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [TagModule, ButtonModule, DividerModule, PipesModule, DatePipe, SharedModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})
export class UserInfoCardComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) { }

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
}
