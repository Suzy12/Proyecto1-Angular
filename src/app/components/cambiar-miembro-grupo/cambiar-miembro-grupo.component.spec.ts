import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarMiembroGrupoComponent } from './cambiar-miembro-grupo.component';

describe('CambiarMiembroGrupoComponent', () => {
  let component: CambiarMiembroGrupoComponent;
  let fixture: ComponentFixture<CambiarMiembroGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarMiembroGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarMiembroGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
