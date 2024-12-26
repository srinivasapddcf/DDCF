import { TestBed } from '@angular/core/testing';

import { SecAssService } from './sec-ass.service';

describe('SecAssService', () => {
  let service: SecAssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecAssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
