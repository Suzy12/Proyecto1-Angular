import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRamaComponent } from './modificar-rama.component';

describe('ModificarRamaComponent', () => {
  let component: ModificarRamaComponent;
  let fixture: ComponentFixture<ModificarRamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarRamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
