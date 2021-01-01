import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposicionRamaZonaComponent } from './composicion-rama-zona.component';

describe('ComposicionRamaZonaComponent', () => {
  let component: ComposicionRamaZonaComponent;
  let fixture: ComponentFixture<ComposicionRamaZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposicionRamaZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposicionRamaZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
