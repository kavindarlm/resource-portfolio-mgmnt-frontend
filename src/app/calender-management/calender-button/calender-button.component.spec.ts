import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderButtonComponent } from './calender-button.component';

describe('CalenderButtonComponent', () => {
  let component: CalenderButtonComponent;
  let fixture: ComponentFixture<CalenderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalenderButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalenderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
