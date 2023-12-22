import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAlumnoMaestroComponent } from './reportes-alumno-maestro.component';

describe('ReportesAlumnoMaestroComponent', () => {
  let component: ReportesAlumnoMaestroComponent;
  let fixture: ComponentFixture<ReportesAlumnoMaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesAlumnoMaestroComponent]
    });
    fixture = TestBed.createComponent(ReportesAlumnoMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
