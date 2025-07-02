import { Component, computed, Input, Signal } from '@angular/core';
import { TimelineItem } from '../../../models/timeline-item.data';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input({required: true}) items: TimelineItem[] | undefined = undefined;
  @Input() skeletonCount: number = 3;

  constructor() { }
}
