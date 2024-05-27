import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCalenderComponent } from './common-calender.component';

describe('CommonCalenderComponent', () => {
  let component: CommonCalenderComponent;
  let fixture: ComponentFixture<CommonCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
