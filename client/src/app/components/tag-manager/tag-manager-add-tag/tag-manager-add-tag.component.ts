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
    console.log("Probando");
    const tagName = (document.getElementById('name') as HTMLInputElement).value.trim();
    if (!tagName) {
      // Manejar el caso en el que el nombre de la etiqueta esté vacío
      return;
    }
  
    const tagData = {
      name: tagName
    };
  
    if (this.selectedCategory === 'Nuevo curso de idiomas') {
      this.tagManagerService.postTag(tagData).subscribe(
        response => {
          // Manejar la respuesta, como actualizar la interfaz de usuario o mostrar un mensaje de éxito
          console.log('Etiqueta creada exitosamente');
        },
        error => {
          // Manejar el error, como mostrar un mensaje de error o registrar en la consola
          console.error('Error al crear la etiqueta:', error);
        }
      );
    }
  }  
}
