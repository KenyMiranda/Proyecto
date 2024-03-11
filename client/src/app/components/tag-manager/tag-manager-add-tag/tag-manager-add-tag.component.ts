import { Component } from '@angular/core';
import { TagManagerService } from 'src/app/services/TagManager/tag-manager.service';


@Component({
  selector: 'app-tag-manager-add-tag',
  templateUrl: './tag-manager-add-tag.component.html',
  styleUrls: ['./tag-manager-add-tag.component.css']
})
export class TagManagerAddTagComponent {
  parentTags: string[] = []; 
  selectedCategory: string | undefined;
  selectedSubCategory: string | undefined;
  isSubcategorySelectorValid: boolean = false;

  constructor(private tagManagerService: TagManagerService) { // Asegúrate de inyectar correctamente el servicio
    this.selectedCategory = '';
    this.selectedSubCategory = '';
  }

  ngOnInit(): void {
    this.loadParentTags();
    this.tagManagerService.getParentTags().subscribe(tags => {
      this.parentTags = tags;
    });
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
      // Muestra una advertencia si no se ha ingresado un nombre de etiqueta
      alert('Por favor, ingrese un nombre para la etiqueta.');
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
            alert('Advertencia: Ya existe una etiqueta con ese nombre. Escoge otro nombre para la nueva etiqueta');
          } else {
            // Si no existe, la creamos
            this.tagManagerService.postTag(tagData).subscribe(
              response => {
                console.log('Etiqueta creada exitosamente');
                // Actualizar la lista de etiquetas después de crear una nueva
                this.loadParentTags();
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

  loadParentTags() {
    this.tagManagerService.getParentTags().subscribe(tags => {
      this.parentTags = tags;
    });
  }
}
