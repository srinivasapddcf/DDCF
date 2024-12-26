import { TestBed } from '@angular/core/testing';

import { DlcoService } from './dlco.service';

describe('DlcoService', () => {
  let service: DlcoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlcoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
