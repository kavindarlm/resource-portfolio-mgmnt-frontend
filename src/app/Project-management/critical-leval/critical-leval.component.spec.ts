import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalLevalComponent } from './critical-leval.component';

describe('CriticalLevalComponent', () => {
  let component: CriticalLevalComponent;
  let fixture: ComponentFixture<CriticalLevalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriticalLevalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriticalLevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
