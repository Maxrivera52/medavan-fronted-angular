import { TestBed } from '@angular/core/testing';

import { CirugiaDetailAnesthesiaService } from './cirugia-detail-anesthesia.service';

describe('CirugiaDetailAnesthesiaService', () => {
  let service: CirugiaDetailAnesthesiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirugiaDetailAnesthesiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
