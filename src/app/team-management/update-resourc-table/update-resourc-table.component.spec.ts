import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResourcTableComponent } from './update-resourc-table.component';

describe('UpdateResourcTableComponent', () => {
  let component: UpdateResourcTableComponent;
  let fixture: ComponentFixture<UpdateResourcTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateResourcTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateResourcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
