import { TestBed } from '@angular/core/testing';

import { SidebarheaderServiceService } from './sidebarheader-service.service';

describe('SidebarheaderServiceService', () => {
  let service: SidebarheaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarheaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
