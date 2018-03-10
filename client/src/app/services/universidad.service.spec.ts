import { TestBed, inject } from '@angular/core/testing';

import { UniversidadService } from './universidad.service';

describe('UniversidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversidadService]
    });
  });

  it('should be created', inject([UniversidadService], (service: UniversidadService) => {
    expect(service).toBeTruthy();
  }));
});
