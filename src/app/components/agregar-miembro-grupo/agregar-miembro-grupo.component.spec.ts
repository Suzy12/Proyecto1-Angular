import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMiembroGrupoComponent } from './agregar-miembro-grupo.component';

describe('AgregarMiembroGrupoComponent', () => {
  let component: AgregarMiembroGrupoComponent;
  let fixture: ComponentFixture<AgregarMiembroGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMiembroGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMiembroGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
