import { TestBed } from '@angular/core/testing';

import { JcService } from './jc.service';

describe('JcService', () => {
  let service: JcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
