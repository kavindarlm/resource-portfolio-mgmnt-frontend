import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectButtunsComponent } from './project-buttuns.component';

describe('ProjectButtunsComponent', () => {
  let component: ProjectButtunsComponent;
  let fixture: ComponentFixture<ProjectButtunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectButtunsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectButtunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
