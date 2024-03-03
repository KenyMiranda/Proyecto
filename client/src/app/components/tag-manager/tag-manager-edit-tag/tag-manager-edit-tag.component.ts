import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-manager-edit-tag',
  templateUrl: './tag-manager-edit-tag.component.html',
  styleUrls: ['./tag-manager-edit-tag.component.css']
})
export class TagManagerEditTagComponent {
  selectedCategory: string = '';
  optionSelected: boolean = false;
  selectedCourse: string = '';

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    // Reset selected course when changing category
    this.selectedCourse = '';
  }

  onSelectOption() {
    this.optionSelected = true;
    // Reset selected category and course when option is changed
    this.selectedCategory = '';
    this.selectedCourse = '';
  }

  onCourseChange(event: any) {
    this.selectedCourse = event.target.value;
  }
}