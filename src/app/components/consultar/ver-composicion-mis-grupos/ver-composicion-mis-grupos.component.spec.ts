import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComposicionMisGruposComponent } from './ver-composicion-mis-grupos.component';

describe('VerComposicionMisGruposComponent', () => {
  let component: VerComposicionMisGruposComponent;
  let fixture: ComponentFixture<VerComposicionMisGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerComposicionMisGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComposicionMisGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
