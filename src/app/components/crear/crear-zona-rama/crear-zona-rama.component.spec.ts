import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearZonaRamaComponent } from './crear-zona-rama.component';

describe('CrearZonaRamaComponent', () => {
  let component: CrearZonaRamaComponent;
  let fixture: ComponentFixture<CrearZonaRamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearZonaRamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearZonaRamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
