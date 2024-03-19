import { Component } from '@angular/core';
import { TagManagerService } from 'src/app/services/TagManager/tag-manager.service';

@Component({
  selector: 'app-tag-manager-edit-tag',
  templateUrl: './tag-manager-edit-tag.component.html',
  styleUrls: ['./tag-manager-edit-tag.component.css']
})
export class TagManagerEditTagComponent {
  selectedCategory: string = '';
  optionSelected: boolean = false;
  selectedCourse: string = '';
  selectedModule: string = '';
  selectedTag: string = ''; // Propiedad para almacenar la etiqueta seleccionada
  originalSelectedTag: string = '';
  tags: string[] = [];
  courses: string[] = []; // Array para almacenar los cursos dinámicos
  modules: any[] = []; // Array para almacenar los módulos dinámicos

  constructor(private tagManagerService: TagManagerService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener todas las etiquetas
    this.tagManagerService.getTags().subscribe(tags => {
      this.tags = tags;
    });
    // Llama al servicio para obtener los módulos
    this.tagManagerService.getModules().subscribe(modules => {
      this.modules = modules;
    });
  }
  
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    // Reset selected course when changing category
    this.selectedCourse = '';
    
    // Si la categoría seleccionada es 'Nuevo módulo para curso de idiomas' o 'Nuevo submódulo para curso de idiomas'
    if (this.selectedCategory === 'Nuevo módulo para curso de idiomas' || this.selectedCategory === 'Nuevo submódulo para curso de idiomas') {
      // Llamar al servicio para obtener los cursos
      this.tagManagerService.getCourses().subscribe(courses => {
        this.courses = courses;
      });
    } else {
      // Si no es una de las categorías mencionadas, reinicia el array de cursos
      this.courses = [];
    }
  }

  onSelectOption() {
    this.optionSelected = true;
    this.originalSelectedTag = this.selectedTag; // Guardar la opción seleccionada originalmente
    // Reset selected category, course, and module when option is changed
    this.selectedCategory = '';
    this.selectedCourse = '';
    this.selectedModule = '';
  }

  onInputChange(event: any) {
    // Restaurar la opción seleccionada original cuando se edita el input de texto
    this.selectedTag = this.originalSelectedTag;
  }

  onCourseChange(event: any) {
    this.selectedCourse = event.target.value;
  }

  saveChanges() {
    const newName = (document.getElementById('name') as HTMLInputElement).value;
    
    if (this.selectedCategory === 'Nuevo curso de idiomas') {
      // Realizar solicitud especial para cambiar el tipo y padre_id
      this.tagManagerService.updateTagTypeAndParentId(this.selectedTag, 'Curso', null).subscribe(() => {
        // Actualizar el nombre de la etiqueta después de actualizar el tipo y padre_id
        this.updateTagNameAndRefreshList(newName);
      });
    } else {
      // Si no es un "Nuevo curso de idiomas", solo actualizar el nombre
      this.updateTagNameAndRefreshList(newName);
    }
  }
  
  updateTagNameAndRefreshList(newName: string) {
    // Llamar al servicio para actualizar el nombre de la etiqueta en la base de datos
    this.tagManagerService.updateTagName(this.selectedTag, newName).subscribe(() => {
      // Actualizar la lista de etiquetas después de guardar los cambios
      this.tagManagerService.getTags().subscribe(tags => {
        this.tags = tags;
      });
      // Resetear variables si es necesario
      this.selectedCategory = '';
      this.selectedCourse = '';
      this.selectedModule = '';
      this.optionSelected = false;
    });
  }   
}