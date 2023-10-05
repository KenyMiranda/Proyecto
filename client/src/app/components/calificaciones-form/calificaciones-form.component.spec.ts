import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesFormComponent } from './calificaciones-form.component';

describe('CalificacionesFormComponent', () => {
  let component: CalificacionesFormComponent;
  let fixture: ComponentFixture<CalificacionesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionesFormComponent]
    });
    fixture = TestBed.createComponent(CalificacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
