import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDialogComponent } from './message-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { By } from '@angular/platform-browser';

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<DynamicDialogRef<MessageDialogComponent>>;
  let mockDynamicDialogConfig: DynamicDialogConfig;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    mockDynamicDialogConfig = {
      data: {
        message: 'Teste'
      }
    };

    await TestBed.configureTestingModule({
      imports: [ButtonModule, MessageDialogComponent],
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig},
        { provide: DynamicDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close method of DialogRef', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.close();

    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });
  
  it('message property should be te same value of imputed config data', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.message).toContain(mockDynamicDialogConfig.data.message);
  })

  it('show p element with imputed message of the config data', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const pElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pElement.textContent).toContain(mockDynamicDialogConfig.data.message);
  });
});
