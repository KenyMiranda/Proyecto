import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesHorasMaestrosComponent } from './reportes-horas-maestros.component';

describe('ReportesHorasMaestrosComponent', () => {
  let component: ReportesHorasMaestrosComponent;
  let fixture: ComponentFixture<ReportesHorasMaestrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesHorasMaestrosComponent]
    });
    fixture = TestBed.createComponent(ReportesHorasMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
