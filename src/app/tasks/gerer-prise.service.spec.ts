import { TestBed } from '@angular/core/testing';

import { GererPriseService } from './gerer-prise.service';

describe('GererPriseService', () => {
  let service: GererPriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererPriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
