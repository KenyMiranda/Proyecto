import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrosListComponent } from './maestros-list.component';

describe('MaestrosListComponent', () => {
  let component: MaestrosListComponent;
  let fixture: ComponentFixture<MaestrosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaestrosListComponent]
    });
    fixture = TestBed.createComponent(MaestrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
