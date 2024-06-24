import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllocationPercentageComponent } from './update-allocation-percentage.component';

describe('UpdateAllocationPercentageComponent', () => {
  let component: UpdateAllocationPercentageComponent;
  let fixture: ComponentFixture<UpdateAllocationPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAllocationPercentageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAllocationPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
