import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarGrupoComponent } from './consultar-grupo.component';

describe('ConsultarGrupoComponent', () => {
  let component: ConsultarGrupoComponent;
  let fixture: ComponentFixture<ConsultarGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
