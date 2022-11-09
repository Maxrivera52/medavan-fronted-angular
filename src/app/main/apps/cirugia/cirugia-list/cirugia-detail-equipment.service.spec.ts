import { TestBed } from '@angular/core/testing';

import { CirugiaDetailEquipmentService } from './cirugia-detail-equipment.service';

describe('CirugiaDetailEquipmentService', () => {
  let service: CirugiaDetailEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirugiaDetailEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
