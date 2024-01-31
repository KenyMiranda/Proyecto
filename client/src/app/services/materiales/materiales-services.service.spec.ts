import { TestBed } from '@angular/core/testing';

import { MaterialesServicesService } from './materiales-services.service';

describe('MaterialesServicesService', () => {
  let service: MaterialesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
