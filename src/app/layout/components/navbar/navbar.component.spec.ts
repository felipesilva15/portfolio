import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { LayoutModule } from '../../layout.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => '1' })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
      declarations: [NavbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('navbarItems loaded after execution of ngOnInit', async () => {
    await fixture.whenStable();

    expect(component.navbarItems?.length).toBeGreaterThan(0);
  });

  it('navbar items element should be rendered', async () => {
    await fixture.whenStable();

    const navbarItemsElementList = fixture.debugElement.queryAll(By.css('li > a'));

    expect(navbarItemsElementList.length).toBe(component.navbarItems.length);
    expect(navbarItemsElementList[0].nativeElement.textContent).toContain(component.navbarItems[0].label);
  })
});
