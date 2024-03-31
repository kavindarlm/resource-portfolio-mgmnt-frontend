import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordButtonComponent } from './dashbord-button.component';

describe('DashbordButtonComponent', () => {
  let component: DashbordButtonComponent;
  let fixture: ComponentFixture<DashbordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbordButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
