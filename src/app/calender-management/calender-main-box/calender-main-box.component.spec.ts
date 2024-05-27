import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderMainBoxComponent } from './calender-main-box.component';

describe('CalenderMainBoxComponent', () => {
  let component: CalenderMainBoxComponent;
  let fixture: ComponentFixture<CalenderMainBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalenderMainBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalenderMainBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
