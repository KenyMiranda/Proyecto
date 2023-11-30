import { TestBed } from '@angular/core/testing';

import { ClasesHorariosService } from './clases-horarios.service';

describe('ClasesHorariosService', () => {
  let service: ClasesHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
