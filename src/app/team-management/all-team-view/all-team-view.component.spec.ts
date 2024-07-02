import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamViewComponent } from './all-team-view.component';

describe('AllTeamViewComponent', () => {
  let component: AllTeamViewComponent;
  let fixture: ComponentFixture<AllTeamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTeamViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
