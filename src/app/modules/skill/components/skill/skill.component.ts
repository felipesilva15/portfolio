import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Skill } from '../../../../models/skill.model';
import { SkillService } from '../../services/skill.service';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    SharedModule,
    SkeletonModule
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit {
  skills!: Skill[];
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private skillService:  SkillService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.skillService.getAll()
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (res: Skill[]) => {
        this.skills = res;
      }
    });
  }
}
