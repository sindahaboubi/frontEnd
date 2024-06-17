import { TestBed } from '@angular/core/testing';

import { GererOrdonnanceService } from './gerer-ordonnance.service';

describe('GererOrdonnanceService', () => {
  let service: GererOrdonnanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererOrdonnanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
