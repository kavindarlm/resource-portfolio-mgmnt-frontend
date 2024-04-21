import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbrdProjectDetailsComponent } from './dashbrd-project-details.component';

describe('DashbrdProjectDetailsComponent', () => {
  let component: DashbrdProjectDetailsComponent;
  let fixture: ComponentFixture<DashbrdProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbrdProjectDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbrdProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
