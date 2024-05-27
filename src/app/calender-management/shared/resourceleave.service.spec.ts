import { TestBed } from '@angular/core/testing';

import { ResourceleaveService } from './resourceleave.service';

describe('ResourceleaveService', () => {
  let service: ResourceleaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceleaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
