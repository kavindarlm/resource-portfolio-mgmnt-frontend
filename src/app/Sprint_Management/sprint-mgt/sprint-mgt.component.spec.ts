import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintMgtComponent } from './sprint-mgt.component';

describe('SprintMgtComponent', () => {
  let component: SprintMgtComponent;
  let fixture: ComponentFixture<SprintMgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintMgtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
