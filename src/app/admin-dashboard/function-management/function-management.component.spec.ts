import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionManagementComponent } from './function-management.component';

describe('FunctionManagementComponent', () => {
  let component: FunctionManagementComponent;
  let fixture: ComponentFixture<FunctionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
