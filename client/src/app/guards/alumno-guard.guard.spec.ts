import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { alumnoGuardGuard } from './alumno-guard.guard';

describe('alumnoGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alumnoGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
