import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbrdProjectListComponent } from './dashbrd-project-list.component';

describe('DashbrdProjectListComponent', () => {
  let component: DashbrdProjectListComponent;
  let fixture: ComponentFixture<DashbrdProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbrdProjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbrdProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
