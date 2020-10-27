import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarZonaComponent } from './modificar-zona.component';

describe('ModificarZonaComponent', () => {
  let component: ModificarZonaComponent;
  let fixture: ComponentFixture<ModificarZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
