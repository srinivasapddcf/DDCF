import { TestBed } from '@angular/core/testing';

import { McuMappingService } from './mcu-mapping.service';

describe('McuMappingService', () => {
  let service: McuMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McuMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
