import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobroleComponent } from './add-jobrole.component';

describe('AddJobroleComponent', () => {
  let component: AddJobroleComponent;
  let fixture: ComponentFixture<AddJobroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
