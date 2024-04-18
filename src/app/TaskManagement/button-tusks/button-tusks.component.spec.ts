import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTusksComponent } from './button-tusks.component';

describe('ButtonTusksComponent', () => {
  let component: ButtonTusksComponent;
  let fixture: ComponentFixture<ButtonTusksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonTusksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTusksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
