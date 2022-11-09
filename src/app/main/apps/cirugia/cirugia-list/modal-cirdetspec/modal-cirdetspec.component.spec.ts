import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCirdetspecComponent } from './modal-cirdetspec.component';

describe('ModalCirdetspecComponent', () => {
  let component: ModalCirdetspecComponent;
  let fixture: ComponentFixture<ModalCirdetspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCirdetspecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCirdetspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
