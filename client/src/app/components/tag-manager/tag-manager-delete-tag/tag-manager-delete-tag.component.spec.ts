import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerDeleteTagComponent } from './tag-manager-delete-tag.component';

describe('TagManagerDeleteTagComponent', () => {
  let component: TagManagerDeleteTagComponent;
  let fixture: ComponentFixture<TagManagerDeleteTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagManagerDeleteTagComponent]
    });
    fixture = TestBed.createComponent(TagManagerDeleteTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
