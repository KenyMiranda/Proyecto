import { TestBed } from '@angular/core/testing';

import { GrabacionesService } from './grabaciones.service';

describe('GrabacionesService', () => {
  let service: GrabacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrabacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
