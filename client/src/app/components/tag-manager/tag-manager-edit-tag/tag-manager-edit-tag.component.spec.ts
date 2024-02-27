import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerEditTagComponent } from './tag-manager-edit-tag.component';

describe('TagManagerEditTagComponent', () => {
  let component: TagManagerEditTagComponent;
  let fixture: ComponentFixture<TagManagerEditTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagManagerEditTagComponent]
    });
    fixture = TestBed.createComponent(TagManagerEditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
