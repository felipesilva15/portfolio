import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../modules/user/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
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
