import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotificacionesComponent } from './ver-notificaciones.component';

describe('VerNotificacionesComponent', () => {
  let component: VerNotificacionesComponent;
  let fixture: ComponentFixture<VerNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
