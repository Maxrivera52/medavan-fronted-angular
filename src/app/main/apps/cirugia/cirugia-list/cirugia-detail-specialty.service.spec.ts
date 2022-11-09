import { TestBed } from '@angular/core/testing';

import { CirugiaDetailSpecialtyService } from './cirugia-detail-specialty.service';

describe('CirugiaDetailSpecialtyService', () => {
  let service: CirugiaDetailSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirugiaDetailSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
