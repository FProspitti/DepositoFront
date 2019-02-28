import { TestBed, inject } from '@angular/core/testing';

import { CaracteristicasService } from './caracteristicas.service';

describe('CaracteristicasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaracteristicasService]
    });
  });

  it('should be created', inject([CaracteristicasService], (service: CaracteristicasService) => {
    expect(service).toBeTruthy();
  }));
});
