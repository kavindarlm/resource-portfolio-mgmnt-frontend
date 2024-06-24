import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllocatedTaskComponent } from './update-allocated-task.component';

describe('UpdateAllocatedTaskComponent', () => {
  let component: UpdateAllocatedTaskComponent;
  let fixture: ComponentFixture<UpdateAllocatedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAllocatedTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAllocatedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
