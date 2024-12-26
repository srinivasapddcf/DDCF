import { TestBed } from '@angular/core/testing';

import { AhService } from './ah.service';

describe('AhService', () => {
  let service: AhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
