import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInfoMiembroComponent } from './consultar-info-miembro.component';

describe('ConsultarInfoMiembroComponent', () => {
  let component: ConsultarInfoMiembroComponent;
  let fixture: ComponentFixture<ConsultarInfoMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarInfoMiembroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarInfoMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
