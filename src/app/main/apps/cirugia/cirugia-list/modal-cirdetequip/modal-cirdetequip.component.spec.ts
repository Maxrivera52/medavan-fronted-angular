import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCirdetequipComponent } from './modal-cirdetequip.component';

describe('ModalCirdetequipComponent', () => {
  let component: ModalCirdetequipComponent;
  let fixture: ComponentFixture<ModalCirdetequipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCirdetequipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCirdetequipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
