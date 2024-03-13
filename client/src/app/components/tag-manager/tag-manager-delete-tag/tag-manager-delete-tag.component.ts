import { Component, OnInit } from '@angular/core';
import { TagManagerService } from 'src/app/services/TagManager/tag-manager.service';
@Component({
  selector: 'app-tag-manager-delete-tag',
  templateUrl: './tag-manager-delete-tag.component.html',
  styleUrls: ['./tag-manager-delete-tag.component.css']
})
export class TagManagerDeleteTagComponent implements OnInit {
  selectedOption: string = ''; // Inicialmente no hay ninguna opción seleccionada
  tagOptions: string[] = []; // Opciones del selector

  constructor(private tagService: TagManagerService) {}

  ngOnInit(): void {
    this.getTagOptions();
  }

  getTagOptions(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tagOptions = tags;
    });
  }

  deleteSelectedTag(): void {
    if (this.selectedOption) {
      this.tagService.deleteTag(this.selectedOption).subscribe(() => {
        console.log("Etiqueta eliminada exitosamente");
        // Aquí puedes actualizar cualquier otra lógica después de eliminar la etiqueta
        this.selectedOption = ''; // Limpiar la selección después de borrar
        this.getTagOptions(); // Actualizar las opciones del selector
      }, error => {
        console.error("Error al eliminar la etiqueta:", error);
        // Aquí puedes manejar errores de eliminación
      });
    }
  }
}