import { Component } from '@angular/core';
import { TagManagerService } from 'src/app/services/TagManager/tag-manager.service';

@Component({
  selector: 'app-tag-manager-add-tag',
  templateUrl: './tag-manager-add-tag.component.html',
  styleUrls: ['./tag-manager-add-tag.component.css'],
})
export class TagManagerAddTagComponent {
  parentTags: string[] = [];
  selectedCategory: string | undefined;
  selectedSubCategory: string | undefined;
  isSubcategorySelectorValid: boolean = false;
  selectedCourse: string | undefined;

  constructor(private tagManagerService: TagManagerService) {
    // Asegúrate de inyectar correctamente el servicio
    this.selectedCategory = '';
    this.selectedSubCategory = '';
    this.selectedCourse = '';
  }

  ngOnInit(): void {
    this.loadParentTags();
    this.tagManagerService.getParentTags().subscribe((tags) => {
      this.parentTags = tags;
    });
  }

  validateSubcategorySelector() {
    return (
      this.selectedCategory === 'Nuevo curso de idiomas' ||
      (this.selectedCategory !== 'Nuevo curso de idiomas' &&
        this.selectedSubCategory !== '')
    );
  }

  onCategoryChange() {
    if (
      this.selectedCategory === 'Nuevo módulo para curso de idiomas' ||
      this.selectedCategory === 'Nuevo submódulo para curso de idiomas'
    ) {
      // Si se selecciona una de las opciones mencionadas, se restablece la selección del submódulo
      this.selectedSubCategory = '';
    }
  }

  createTag() {
    const tagName = (
      document.getElementById('name') as HTMLInputElement
    ).value.trim();
    if (!tagName) {
      alert('Por favor, ingrese un nombre para la etiqueta.');
      return;
    }

    const tagData = {
      name: tagName,
      type: 'Curso', // Tipo de etiqueta
      parent_id: null as number | null, // No hay un padre para el curso
    };

    if (this.selectedCategory === 'Nuevo curso de idiomas') {
      this.createTagWithParent(tagData);
    } else if (this.selectedCategory === 'Nuevo módulo para curso de idiomas') {
      if (!this.selectedCourse) {
        alert('Por favor, selecciona un curso.');
        return;
      }
      // Obtener el ID del curso seleccionado
      this.tagManagerService.getTagIdByName(this.selectedCourse).subscribe(
        (courseId) => {
          if (courseId) {
            // Comprueba si courseId existe (no es null o undefined)
            tagData.type = 'Módulo'; // Tipo de etiqueta
            tagData.parent_id = courseId;
            this.createTagWithParent(tagData);
          } else {
            alert('Error: No se pudo encontrar el ID del curso seleccionado.');
          }
        },
        (error) => {
          console.error('Error al obtener el ID del curso:', error);
          alert('Error al obtener el ID del curso.');
        }
      );
    }
  }

  createTagWithParent(tagData: any) {
    this.tagManagerService.postTag(tagData).subscribe(
      (response) => {
        console.log('Etiqueta creada exitosamente');
        this.loadParentTags();
      },
      (error) => {
        console.error('Error al crear la etiqueta:', error);
        alert('Error al crear la etiqueta.');
      }
    );
  }

  loadParentTags() {
    this.tagManagerService.getParentTags().subscribe((tags) => {
      this.parentTags = tags;
    });
  }
}
