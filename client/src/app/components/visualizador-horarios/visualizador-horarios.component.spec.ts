import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorHorariosComponent } from './visualizador-horarios.component';

describe('VisualizadorHorariosComponent', () => {
  let component: VisualizadorHorariosComponent;
  let fixture: ComponentFixture<VisualizadorHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizadorHorariosComponent]
    });
    fixture = TestBed.createComponent(VisualizadorHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
