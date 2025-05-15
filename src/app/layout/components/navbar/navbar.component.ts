import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../../../models/navbar-item.data';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  navbarItems!: NavbarItem[];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.navbarItems = [
      { label: 'Sobre mim', route: '/' },
      { label: 'Currículo', route: '/resume' },
      { label: 'Portfólio', route: '/portfolio' },
      { label: 'Contato', route: '/contact' }
    ];
  }
}
