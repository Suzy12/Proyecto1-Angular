import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComposicionMisGruposLiderComponent } from './ver-composicion-mis-grupos-lider.component';

describe('VerComposicionMisGruposLiderComponent', () => {
  let component: VerComposicionMisGruposLiderComponent;
  let fixture: ComponentFixture<VerComposicionMisGruposLiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerComposicionMisGruposLiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComposicionMisGruposLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
