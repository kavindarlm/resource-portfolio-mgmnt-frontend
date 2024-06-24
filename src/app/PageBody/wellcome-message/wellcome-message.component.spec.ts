import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomeMessageComponent } from './wellcome-message.component';

describe('WellcomeMessageComponent', () => {
  let component: WellcomeMessageComponent;
  let fixture: ComponentFixture<WellcomeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellcomeMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
