import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-manager-assign-tags',
  templateUrl: './tag-manager-assign-tags.component.html',
  styleUrls: ['./tag-manager-assign-tags.component.css']
})
export class TagManagerAssignTagsComponent {
  optionSelected: boolean = false;
  atLeastOneChecked: boolean = false;
  numOptions: number = 0;

  onSelectOption() {
    this.optionSelected = true;
    this.checkIfChecked();
  }

  checkIfChecked() {
    const checkboxes = document.querySelectorAll('.member-checkbox');
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => (checkbox as HTMLInputElement).checked);
    this.atLeastOneChecked = checkedCheckboxes.length > 0;
  }  
}
