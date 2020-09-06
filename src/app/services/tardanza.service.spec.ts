import { TestBed } from '@angular/core/testing';

import { TardanzaService } from './tardanza.service';

describe('TardanzaService', () => {
  let service: TardanzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TardanzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
