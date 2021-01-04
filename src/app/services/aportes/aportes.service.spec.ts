import { TestBed } from '@angular/core/testing';

import { AportesService } from './aportes.service';

describe('AportesService', () => {
  let service: AportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
