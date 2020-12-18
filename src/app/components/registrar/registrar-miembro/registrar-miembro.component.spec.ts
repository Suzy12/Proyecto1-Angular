import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMiembroComponent } from './registrar-miembro.component';

describe('RegistrarMiembroComponent', () => {
  let component: RegistrarMiembroComponent;
  let fixture: ComponentFixture<RegistrarMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMiembroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
