import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedResourceListComponent } from './added-resource-list.component';

describe('AddedResourceListComponent', () => {
  let component: AddedResourceListComponent;
  let fixture: ComponentFixture<AddedResourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddedResourceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
