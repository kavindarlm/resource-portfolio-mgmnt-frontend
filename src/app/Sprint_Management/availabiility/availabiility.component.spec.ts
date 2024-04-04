import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabiilityComponent } from './availabiility.component';

describe('AvailabiilityComponent', () => {
  let component: AvailabiilityComponent;
  let fixture: ComponentFixture<AvailabiilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailabiilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailabiilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
