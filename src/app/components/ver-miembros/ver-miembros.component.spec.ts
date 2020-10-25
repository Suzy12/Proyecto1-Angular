import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiembrosComponent } from './ver-miembros.component';

describe('VerMiembrosComponent', () => {
  let component: VerMiembrosComponent;
  let fixture: ComponentFixture<VerMiembrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMiembrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
