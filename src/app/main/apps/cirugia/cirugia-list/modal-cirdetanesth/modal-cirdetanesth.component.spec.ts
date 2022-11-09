import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCirdetanesthComponent } from './modal-cirdetanesth.component';

describe('ModalCirdetanesthComponent', () => {
  let component: ModalCirdetanesthComponent;
  let fixture: ComponentFixture<ModalCirdetanesthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCirdetanesthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCirdetanesthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
