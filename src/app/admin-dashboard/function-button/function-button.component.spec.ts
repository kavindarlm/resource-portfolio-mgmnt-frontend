import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionButtonComponent } from './function-button.component';

describe('FunctionButtonComponent', () => {
  let component: FunctionButtonComponent;
  let fixture: ComponentFixture<FunctionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
