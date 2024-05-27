import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCalenderComponent } from './resource-calender.component';

describe('ResourceCalenderComponent', () => {
  let component: ResourceCalenderComponent;
  let fixture: ComponentFixture<ResourceCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
