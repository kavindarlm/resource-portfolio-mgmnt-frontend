import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedResourceInformationComponent } from './allocated-resource-information.component';

describe('AllocatedResourceInformationComponent', () => {
  let component: AllocatedResourceInformationComponent;
  let fixture: ComponentFixture<AllocatedResourceInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocatedResourceInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllocatedResourceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
