import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveTreeComponent } from './responsive-tree.component';

describe('ResponsiveTreeComponent', () => {
  let component: ResponsiveTreeComponent;
  let fixture: ComponentFixture<ResponsiveTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsiveTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsiveTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
