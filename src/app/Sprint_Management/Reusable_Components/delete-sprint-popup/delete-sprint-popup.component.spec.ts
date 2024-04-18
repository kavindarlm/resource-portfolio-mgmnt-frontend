import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSprintPopupComponent } from './delete-sprint-popup.component';

describe('DeleteSprintPopupComponent', () => {
  let component: DeleteSprintPopupComponent;
  let fixture: ComponentFixture<DeleteSprintPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSprintPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSprintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
