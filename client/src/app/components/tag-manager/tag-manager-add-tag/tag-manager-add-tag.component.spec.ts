import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerAddTagComponent } from './tag-manager-add-tag.component';

describe('TagManagerAddTagComponent', () => {
  let component: TagManagerAddTagComponent;
  let fixture: ComponentFixture<TagManagerAddTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagManagerAddTagComponent]
    });
    fixture = TestBed.createComponent(TagManagerAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
