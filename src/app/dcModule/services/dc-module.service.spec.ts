import { TestBed } from '@angular/core/testing';

import { DcModuleService } from './dc-module.service';

describe('DcModuleService', () => {
  let service: DcModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
