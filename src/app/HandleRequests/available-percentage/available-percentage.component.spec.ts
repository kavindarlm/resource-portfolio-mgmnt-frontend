import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePercentageComponent } from './available-percentage.component';

describe('AvailablePercentageComponent', () => {
  let component: AvailablePercentageComponent;
  let fixture: ComponentFixture<AvailablePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailablePercentageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailablePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
