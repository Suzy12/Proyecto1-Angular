import { TestBed } from '@angular/core/testing';

import { RamaService } from './rama.service';

describe('RamaService', () => {
  let service: RamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
