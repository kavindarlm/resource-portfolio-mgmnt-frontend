import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDasbdBodyComponent } from './admin-dasbd-body.component';

describe('AdminDasbdBodyComponent', () => {
  let component: AdminDasbdBodyComponent;
  let fixture: ComponentFixture<AdminDasbdBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDasbdBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDasbdBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
