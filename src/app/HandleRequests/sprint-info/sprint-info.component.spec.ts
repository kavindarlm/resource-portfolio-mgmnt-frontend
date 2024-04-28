import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintInfoComponent } from './sprint-info.component';

describe('SprintInfoComponent', () => {
  let component: SprintInfoComponent;
  let fixture: ComponentFixture<SprintInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
