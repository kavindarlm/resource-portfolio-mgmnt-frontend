import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSprintFormComponent } from './edit-sprint-form.component';

describe('EditSprintFormComponent', () => {
  let component: EditSprintFormComponent;
  let fixture: ComponentFixture<EditSprintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSprintFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSprintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
