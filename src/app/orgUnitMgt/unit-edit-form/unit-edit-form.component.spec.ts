import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEditFormComponent } from './unit-edit-form.component';

describe('UnitEditFormComponent', () => {
  let component: UnitEditFormComponent;
  let fixture: ComponentFixture<UnitEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
