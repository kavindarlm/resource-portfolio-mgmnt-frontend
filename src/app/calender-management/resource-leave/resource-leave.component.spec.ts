import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceLeaveComponent } from './resource-leave.component';

describe('ResourceLeaveComponent', () => {
  let component: ResourceLeaveComponent;
  let fixture: ComponentFixture<ResourceLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
