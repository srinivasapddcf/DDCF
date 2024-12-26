import { TestBed } from '@angular/core/testing';

import { MdssService } from './mdss.service';

describe('MdssService', () => {
  let service: MdssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
