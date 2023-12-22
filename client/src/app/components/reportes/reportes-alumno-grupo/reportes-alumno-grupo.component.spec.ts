import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAlumnoGrupoComponent } from './reportes-alumno-grupo.component';

describe('ReportesAlumnoGrupoComponent', () => {
  let component: ReportesAlumnoGrupoComponent;
  let fixture: ComponentFixture<ReportesAlumnoGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesAlumnoGrupoComponent]
    });
    fixture = TestBed.createComponent(ReportesAlumnoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
