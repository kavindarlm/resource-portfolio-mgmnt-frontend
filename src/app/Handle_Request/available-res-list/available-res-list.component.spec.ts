import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableResListComponent } from './available-res-list.component';

describe('AvailableResListComponent', () => {
  let component: AvailableResListComponent;
  let fixture: ComponentFixture<AvailableResListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableResListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableResListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
