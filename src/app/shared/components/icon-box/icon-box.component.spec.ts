import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBoxComponent } from './icon-box.component';
import { By } from '@angular/platform-browser';

describe('IconBoxComponent', () => {
  let component: IconBoxComponent;
  let fixture: ComponentFixture<IconBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the component with input value', () => {
    component.iconClass = 'pi-github';

    fixture.detectChanges();

    expect(component.iconClass).toBe('pi-github');
  });

  it('show the icon element with imputed class name', () => {
    component.iconClass = 'pi-github';

    fixture.detectChanges();

    const iconElement: HTMLElement = fixture.debugElement.query(By.css('i')).nativeElement;
    expect(iconElement.classList).toContain('pi-github');
  });
});
