import { TestBed } from '@angular/core/testing';

import { DistrictHoService } from './district-ho.service';

describe('DistrictHoService', () => {
  let service: DistrictHoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictHoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
