import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-manager-add-tag',
  templateUrl: './tag-manager-add-tag.component.html',
  styleUrls: ['./tag-manager-add-tag.component.css']
})
export class TagManagerAddTagComponent {
  selectedCategory: string | undefined;
  selectedSubCategory: string | undefined;
  isSubcategorySelectorValid: boolean = false;

  constructor() {
    this.selectedCategory = '';
    this.selectedSubCategory = '';
  }

  validateSubcategorySelector() {
    return this.selectedCategory === 'Nuevo curso de idiomas' || (this.selectedCategory !== 'Nuevo curso de idiomas' && this.selectedSubCategory !== '');
  }

  onCategoryChange() {
    if (this.selectedCategory === 'Nuevo módulo para curso de idiomas' || 
        this.selectedCategory === 'Nuevo submódulo para curso de idiomas') {
      // Si se selecciona una de las opciones mencionadas, se restablece la selección del submódulo
      this.selectedSubCategory = '';
    }
  }
}
