import { TestBed, inject } from '@angular/core/testing';

import { SecionService } from './secion.service';

describe('SecionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecionService]
    });
  });

  it('should be created', inject([SecionService], (service: SecionService) => {
    expect(service).toBeTruthy();
  }));
});
