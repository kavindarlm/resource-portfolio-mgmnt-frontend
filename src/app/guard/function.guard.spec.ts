import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { functionGuard } from './function.guard';

describe('functionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => functionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
