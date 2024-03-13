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
  modules: any[] = [];
  selectedModule: string | undefined;

  constructor(private tagManagerService: TagManagerService) {
    // Asegúrate de inyectar correctamente el servicio
    this.selectedCategory = '';
    this.selectedSubCategory = '';
    this.selectedCourse = '';
    this.selectedModule = '';
  }

  ngOnInit(): void {
    this.loadParentTags();
    this.tagManagerService.getParentTags().subscribe((tags) => {
      this.parentTags = tags;
    });
  }

  validateSubcategorySelector() {
    if (this.selectedCategory === 'Nuevo curso de idiomas') {
      return true; // Permitir siempre que se seleccione 'Nuevo curso de idiomas'
    } else if (this.selectedCategory === 'Nuevo módulo para curso de idiomas') {
      return true; // Permitir siempre que se seleccione 'Nuevo módulo para curso de idiomas'
    } else if (
      this.selectedCategory === 'Nuevo submódulo para curso de idiomas'
    ) {
      return this.selectedSubCategory !== undefined; // Permitir solo si se selecciona un módulo
    }
    return false; // Restringir para otros casos
  }

  onCategoryChange() {
    if (this.selectedCategory === 'Nuevo módulo para curso de idiomas') {
      // Restablecer la selección del submódulo si se elige esta opción
      this.selectedSubCategory = '';
    } else if (
      this.selectedCategory === 'Nuevo submódulo para curso de idiomas'
    ) {
      // Cargar los módulos solo si se elige esta opción
      this.loadModules();
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

    this.tagManagerService.checkTagExists(tagName).subscribe(
      (response) => {
        if (response.exists) {
          alert('Ya existe una etiqueta con este nombre.');
        } else {
          const tagData = {
            name: tagName,
            type: 'Curso', // Tipo de etiqueta predeterminado
            parent_id: null as number | null, // No hay un padre para el curso
          };

          if (this.selectedCategory === 'Nuevo módulo para curso de idiomas') {
            if (!this.selectedCourse) {
              alert('Por favor, selecciona un curso.');
              return;
            }
            // Obtener el ID del curso seleccionado
            this.tagManagerService
              .getTagIdByName(this.selectedCourse, 'Curso')
              .subscribe(
                (courseId) => {
                  if (courseId) {
                    // Comprueba si courseId existe (no es null o undefined)
                    tagData.type = 'Módulo'; // Tipo de etiqueta
                    tagData.parent_id = courseId;
                    this.createTagWithParent(tagData);
                  } else {
                    alert(
                      'Error: No se pudo encontrar el ID del curso seleccionado.'
                    );
                  }
                },
                (error) => {
                  console.error('Error al obtener el ID del curso:', error);
                  alert('Error al obtener el ID del curso.');
                }
              );
          } else if (
            this.selectedCategory === 'Nuevo submódulo para curso de idiomas'
          ) {
            if (!this.selectedSubCategory) {
              // Cambio aquí
              alert('Por favor, selecciona un módulo.'); // Cambio aquí
              return;
            }
            // Obtener el ID del módulo seleccionado
            this.tagManagerService
              .getTagIdByName(this.selectedSubCategory, 'Módulo')
              .subscribe(
                (moduleId) => {
                  if (moduleId) {
                    // Comprueba si moduleId existe (no es null o undefined)
                    tagData.type = 'Submódulo'; // Tipo de etiqueta
                    tagData.parent_id = moduleId;
                    this.createTagWithParent(tagData);
                  } else {
                    alert(
                      'Error: No se pudo encontrar el ID del módulo seleccionado.'
                    );
                  }
                },
                (error) => {
                  console.error('Error al obtener el ID del módulo:', error);
                  alert('Error al obtener el ID del módulo.');
                }
              );
          } else {
            // Si no es 'Nuevo módulo para curso de idiomas' ni 'Nuevo submódulo para curso de idiomas'
            this.createTagWithParent(tagData);
          }
        }
      },
      (error) => {
        console.error(
          'Error al verificar la existencia de la etiqueta:',
          error
        );
        alert('Error al verificar la existencia de la etiqueta.');
      }
    );
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

  loadModules() {
    this.tagManagerService.getModules().subscribe(
      (modules) => {
        this.modules = modules;
      },
      (error) => {
        console.error('Error al obtener los módulos:', error);
      }
    );
  }
}
