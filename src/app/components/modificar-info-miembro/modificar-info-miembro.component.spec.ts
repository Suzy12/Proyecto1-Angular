import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInfoMiembroComponent } from './modificar-info-miembro.component';

describe('ModificarInfoMiembroComponent', () => {
  let component: ModificarInfoMiembroComponent;
  let fixture: ComponentFixture<ModificarInfoMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarInfoMiembroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInfoMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
