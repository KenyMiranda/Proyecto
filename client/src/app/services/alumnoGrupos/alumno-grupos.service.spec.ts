import { TestBed } from '@angular/core/testing';

import { AlumnoGruposService } from './alumno-grupos.service';

describe('AlumnoGruposService', () => {
  let service: AlumnoGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
