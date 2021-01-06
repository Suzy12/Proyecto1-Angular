import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AporteComponent } from './aporte.component';

describe('AporteComponent', () => {
  let component: AporteComponent;
  let fixture: ComponentFixture<AporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
