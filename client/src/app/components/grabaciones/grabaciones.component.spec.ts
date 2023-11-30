import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabacionesComponent } from './grabaciones.component';

describe('GrabacionesComponent', () => {
  let component: GrabacionesComponent;
  let fixture: ComponentFixture<GrabacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrabacionesComponent]
    });
    fixture = TestBed.createComponent(GrabacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
