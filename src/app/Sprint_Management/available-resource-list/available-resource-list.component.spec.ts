import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableResourceListComponent } from './available-resource-list.component';

describe('AvailableResourceListComponent', () => {
  let component: AvailableResourceListComponent;
  let fixture: ComponentFixture<AvailableResourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableResourceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
