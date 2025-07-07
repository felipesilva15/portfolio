import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { By } from '@angular/platform-browser';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineItem } from '../../../models/timeline-item.data';
import { ButtonModule } from 'primeng/button';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonModule, ButtonModule],
      declarations: [TimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('don\'t show item and skeleton elements when items property is empty', async () => {
    component.items = [];
    component.skeletonCount = 2;

    fixture.detectChanges();
    await fixture.whenStable();

    const ulElement = fixture.debugElement.query(By.css('ul.list'));
    expect(ulElement).toBeTruthy();

    const itemElementList = fixture.debugElement.queryAll(By.css('li > ul.list'));
    expect(itemElementList.length).toBe(0);

    const skeletonElement = fixture.debugElement.query(By.css('p-skeleton'));
    expect(skeletonElement).toBeNull();
  });

  it('show skeleton elements when items property is undefined', async () => {
    component.items = undefined;
    component.skeletonCount = 2;

    fixture.detectChanges();
    await fixture.whenStable();

    const skeletonElement = fixture.debugElement.query(By.css('p-skeleton'));
    expect(skeletonElement).toBeTruthy();
  });

  it('show correct skeleton elements count when skeletonCount property is defined', async () => {
    component.items = undefined;
    component.skeletonCount = 5;

    fixture.detectChanges();
    await fixture.whenStable();

    const verticalSkeletonElement = fixture.debugElement.query(By.css('p-skeleton[width="12px"]'));
    expect(verticalSkeletonElement).toBeTruthy();

    const itemSkeletonElementList = fixture.debugElement.queryAll(By.css('p-skeleton[height="73px"]'));
    expect(itemSkeletonElementList.length).toBe(5);
  });

  it('show items list elements when items is set', async () => {
    const dummyItems: TimelineItem[] = [
      { title: 'Item 1', subtitle: 'Sub 1', description: 'Desc 1', linkLabel: 'Link 1', linkUrl: 'http://localhost:4200/link-1' },
      { title: 'Item 2', subtitle: 'Sub 2', description: 'Desc 2' },
    ];

    component.items = dummyItems;

    fixture.detectChanges();
    await fixture.whenStable();

    const ulElement = fixture.debugElement.query(By.css('ul.list'));
    expect(ulElement).toBeTruthy();

    const itemElementList = fixture.debugElement.queryAll(By.css('li.item'));
    expect(itemElementList.length).toBe(dummyItems.length);

    expect(itemElementList[0].nativeElement.textContent).toContain('Item 1');
    expect(itemElementList[0].nativeElement.textContent).toContain('Desc 1');
    expect(itemElementList[0].nativeElement.textContent).toContain('Link 1');

    expect(itemElementList[1].nativeElement.textContent).toContain('Item 2');
    expect(itemElementList[1].nativeElement.textContent).toContain('Desc 2');
  });
});
