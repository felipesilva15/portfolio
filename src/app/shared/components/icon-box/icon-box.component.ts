import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-box',
  standalone: false,
  templateUrl: './icon-box.component.html',
  styleUrl: './icon-box.component.scss'
})
export class IconBoxComponent {
  @Input({required: true, alias: 'icon-class'}) iconClass!: string;

  constructor() { }
}
