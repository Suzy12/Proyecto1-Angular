import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAportesComponent } from './ver-aportes.component';

describe('VerAportesComponent', () => {
  let component: VerAportesComponent;
  let fixture: ComponentFixture<VerAportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
