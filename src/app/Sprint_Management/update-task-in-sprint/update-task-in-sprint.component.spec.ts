import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskInSprintComponent } from './update-task-in-sprint.component';

describe('UpdateTaskInSprintComponent', () => {
  let component: UpdateTaskInSprintComponent;
  let fixture: ComponentFixture<UpdateTaskInSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaskInSprintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTaskInSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
