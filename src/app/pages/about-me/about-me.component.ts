import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../modules/user/services/user.service';
import { User } from '../../models/user.model';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    SharedModule,
    SkeletonModule
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  user!: User;
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);

    this.userService.getById(1)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (res: User) => {
        this.user = res;
      }
    });
  }
}
