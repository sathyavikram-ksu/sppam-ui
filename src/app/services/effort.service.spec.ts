import { TestBed } from '@angular/core/testing';

import { EffortService } from './effort.service';

describe('EffortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EffortService = TestBed.get(EffortService);
    expect(service).toBeTruthy();
  });
});
