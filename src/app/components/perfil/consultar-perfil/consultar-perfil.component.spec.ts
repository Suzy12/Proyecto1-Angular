import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPerfilComponent } from './consultar-perfil.component';

describe('ConsultarPerfilComponent', () => {
  let component: ConsultarPerfilComponent;
  let fixture: ComponentFixture<ConsultarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
