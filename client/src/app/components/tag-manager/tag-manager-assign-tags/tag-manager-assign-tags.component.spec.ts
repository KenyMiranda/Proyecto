import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerAssignTagsComponent } from './tag-manager-assign-tags.component';

describe('TagManagerAssignTagsComponent', () => {
  let component: TagManagerAssignTagsComponent;
  let fixture: ComponentFixture<TagManagerAssignTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagManagerAssignTagsComponent]
    });
    fixture = TestBed.createComponent(TagManagerAssignTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
