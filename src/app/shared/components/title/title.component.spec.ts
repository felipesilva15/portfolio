import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { By } from '@angular/platform-browser';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the component with input value', () => {
    component.text = 'Sobre mim';

    fixture.detectChanges();

    expect(component.text).toBe('Sobre mim');
  });

  it('show de title element with imputed value', () => {
    component.text = 'Sobre mim';

    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Sobre mim');
  });
});
