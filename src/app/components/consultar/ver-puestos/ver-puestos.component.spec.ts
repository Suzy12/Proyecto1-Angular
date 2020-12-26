import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPuestosComponent } from './ver-puestos.component';

describe('VerPuestosComponent', () => {
  let component: VerPuestosComponent;
  let fixture: ComponentFixture<VerPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
