import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAlumnoFechaComponent } from './reportes-alumno-fecha.component';

describe('ReportesAlumnoFechaComponent', () => {
  let component: ReportesAlumnoFechaComponent;
  let fixture: ComponentFixture<ReportesAlumnoFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesAlumnoFechaComponent]
    });
    fixture = TestBed.createComponent(ReportesAlumnoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
