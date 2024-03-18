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
    // Reset selected category, course, and module when option is changed
    this.selectedCategory = '';
    this.selectedCourse = '';
    this.selectedModule = '';
  }

  onCourseChange(event: any) {
    this.selectedCourse = event.target.value;
  }

  saveChanges() {
    // Obtener el nuevo nombre de la etiqueta
    const newName = (document.getElementById('name') as HTMLInputElement).value;
    // Llamar al servicio para actualizar el nombre de la etiqueta en la base de datos
    this.tagManagerService.updateTagName(this.selectedTag, newName).subscribe(() => {
      // Actualizar la lista de etiquetas después de guardar los cambios si es necesario
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