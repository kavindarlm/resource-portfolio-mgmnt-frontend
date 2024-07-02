import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayStatusComponent } from './today-status.component';

describe('TodayStatusComponent', () => {
  let component: TodayStatusComponent;
  let fixture: ComponentFixture<TodayStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodayStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
