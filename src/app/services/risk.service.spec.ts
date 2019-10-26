import { TestBed } from '@angular/core/testing';

import { RiskService } from './risk.service';

describe('RiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskService = TestBed.get(RiskService);
    expect(service).toBeTruthy();
  });
});
