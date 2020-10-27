import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMovimientoComponent } from './modificar-movimiento.component';

describe('ModificarMovimientoComponent', () => {
  let component: ModificarMovimientoComponent;
  let fixture: ComponentFixture<ModificarMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMovimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
