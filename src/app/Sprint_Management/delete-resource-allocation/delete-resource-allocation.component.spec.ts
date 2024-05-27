import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResourceAllocationComponent } from './delete-resource-allocation.component';

describe('DeleteResourceAllocationComponent', () => {
  let component: DeleteResourceAllocationComponent;
  let fixture: ComponentFixture<DeleteResourceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteResourceAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteResourceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
