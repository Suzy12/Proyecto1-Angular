import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInfoMovimientoComponent } from './consultar-info-movimiento.component';

describe('ConsultarInfoMovimientoComponent', () => {
  let component: ConsultarInfoMovimientoComponent;
  let fixture: ComponentFixture<ConsultarInfoMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarInfoMovimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarInfoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
