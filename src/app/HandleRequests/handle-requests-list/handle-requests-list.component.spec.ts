import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleRequestsListComponent } from './handle-requests-list.component';

describe('HandleRequestsListComponent', () => {
  let component: HandleRequestsListComponent;
  let fixture: ComponentFixture<HandleRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleRequestsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
