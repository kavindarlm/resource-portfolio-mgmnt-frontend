import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgPsswdComponent } from './fg-psswd.component';

describe('FgPsswdComponent', () => {
  let component: FgPsswdComponent;
  let fixture: ComponentFixture<FgPsswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgPsswdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FgPsswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
