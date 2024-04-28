import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedResourcesComponent } from './added-resources.component';

describe('AddedResourcesComponent', () => {
  let component: AddedResourcesComponent;
  let fixture: ComponentFixture<AddedResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddedResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
