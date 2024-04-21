import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamButtonComponent } from './new-team-button.component';

describe('NewTeamButtonComponent', () => {
  let component: NewTeamButtonComponent;
  let fixture: ComponentFixture<NewTeamButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTeamButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTeamButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
