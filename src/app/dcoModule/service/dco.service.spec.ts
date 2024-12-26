import { TestBed } from '@angular/core/testing';

import { DcoService } from './dco.service';

describe('DcoService', () => {
  let service: DcoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
