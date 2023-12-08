import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { maestroGuardGuard } from './maestro-guard.guard';

describe('maestroGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => maestroGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
