import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCalenderComponent } from './global-calender.component';

describe('GlobalCalenderComponent', () => {
  let component: GlobalCalenderComponent;
  let fixture: ComponentFixture<GlobalCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
