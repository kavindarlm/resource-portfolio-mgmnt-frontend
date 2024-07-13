import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSprintDetailsComponent } from './all-sprint-details.component';

describe('AllSprintDetailsComponent', () => {
  let component: AllSprintDetailsComponent;
  let fixture: ComponentFixture<AllSprintDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSprintDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSprintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
