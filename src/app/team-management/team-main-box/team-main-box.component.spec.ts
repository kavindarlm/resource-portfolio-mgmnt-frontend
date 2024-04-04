import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMainBoxComponent } from './team-main-box.component';

describe('TeamMainBoxComponent', () => {
  let component: TeamMainBoxComponent;
  let fixture: ComponentFixture<TeamMainBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamMainBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMainBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
