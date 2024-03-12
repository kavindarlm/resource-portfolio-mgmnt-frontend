import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAccComponent } from './login-acc.component';

describe('LoginAccComponent', () => {
  let component: LoginAccComponent;
  let fixture: ComponentFixture<LoginAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginAccComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
