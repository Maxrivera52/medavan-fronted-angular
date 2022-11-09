import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServdetspecComponent } from './modal-servdetspec.component';

describe('ModalServdetspecComponent', () => {
  let component: ModalServdetspecComponent;
  let fixture: ComponentFixture<ModalServdetspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServdetspecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServdetspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
