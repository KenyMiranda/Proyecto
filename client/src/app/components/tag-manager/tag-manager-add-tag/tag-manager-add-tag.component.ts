import { Component } from '@angular/core';
import { TagManagerService } from 'src/app/services/TagManager/tag-manager.service';


@Component({
  selector: 'app-tag-manager-add-tag',
  templateUrl: './tag-manager-add-tag.component.html',
  styleUrls: ['./tag-manager-add-tag.component.css']
})
export class TagManagerAddTagComponent {
  selectedCategory: string | undefined;
  selectedSubCategory: string | undefined;
  isSubcategorySelectorValid: boolean = false;

  constructor(private tagManagerService: TagManagerService) { // Asegúrate de inyectar correctamente el servicio
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

  createTag() {
    const tagName = (document.getElementById('name') as HTMLInputElement).value.trim();
    if (!tagName) {
      // Handle empty tag name case
      return;
    }

    const tagData = {
      name: tagName
    };

    if (this.selectedCategory === 'Nuevo curso de idiomas') {
      // Antes de crear la etiqueta, verificamos si ya existe
      this.tagManagerService.checkTagExists(tagName).subscribe(
        response => {
          if (response.exists) {
            alert('¡La etiqueta ya existe!');
          } else {
            // Si no existe, la creamos
            this.tagManagerService.postTag(tagData).subscribe(
              response => {
                console.log('Etiqueta creada exitosamente');
                // Handle success response here
              },
              error => {
                console.error('Error al crear la etiqueta:', error);
                // Handle error response here
              }
            );
          }
        },
        error => {
          console.error('Error al verificar la existencia de la etiqueta:', error);
          // Handle error response here
        }
      );
    }
  }
}