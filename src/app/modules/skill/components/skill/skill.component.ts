import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Skill } from '../../../../models/skill.model';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit {
  skills!: Skill[];

  constructor(private skillService:  SkillService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.skillService.getAll().subscribe({
      next: (res: Skill[]) => {
        this.skills = res;
      }
    });
  }
}
