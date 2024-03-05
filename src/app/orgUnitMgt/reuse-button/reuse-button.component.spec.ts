import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseButtonComponent } from './reuse-button.component';

describe('ReuseButtonComponent', () => {
  let component: ReuseButtonComponent;
  let fixture: ComponentFixture<ReuseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReuseButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReuseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
