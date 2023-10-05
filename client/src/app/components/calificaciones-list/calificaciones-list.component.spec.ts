import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesListComponent } from './calificaciones-list.component';

describe('CalificacionesListComponent', () => {
  let component: CalificacionesListComponent;
  let fixture: ComponentFixture<CalificacionesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionesListComponent]
    });
    fixture = TestBed.createComponent(CalificacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
