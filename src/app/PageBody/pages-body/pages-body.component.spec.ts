import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBodyComponent } from './pages-body.component';

describe('PagesBodyComponent', () => {
  let component: PagesBodyComponent;
  let fixture: ComponentFixture<PagesBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
