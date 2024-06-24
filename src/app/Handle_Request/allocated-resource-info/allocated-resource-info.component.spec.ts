import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedResourceInfoComponent } from './allocated-resource-info.component';

describe('AllocatedResourceInfoComponent', () => {
  let component: AllocatedResourceInfoComponent;
  let fixture: ComponentFixture<AllocatedResourceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocatedResourceInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllocatedResourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
