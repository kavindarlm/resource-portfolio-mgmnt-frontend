import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSprintListComponent } from './all-sprint-list.component';

describe('AllSprintListComponent', () => {
  let component: AllSprintListComponent;
  let fixture: ComponentFixture<AllSprintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSprintListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSprintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
