import { TestBed } from '@angular/core/testing';

import { AsistenciaSService } from './asistencia-s.service';

describe('AsistenciaSService', () => {
  let service: AsistenciaSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
