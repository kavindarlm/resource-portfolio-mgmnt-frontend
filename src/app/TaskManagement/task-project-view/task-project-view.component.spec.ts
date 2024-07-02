import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProjectViewComponent } from './task-project-view.component';

describe('TaskProjectViewComponent', () => {
  let component: TaskProjectViewComponent;
  let fixture: ComponentFixture<TaskProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskProjectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
