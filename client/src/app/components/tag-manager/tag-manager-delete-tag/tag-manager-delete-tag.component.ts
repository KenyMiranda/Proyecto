import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-manager-delete-tag',
  templateUrl: './tag-manager-delete-tag.component.html',
  styleUrls: ['./tag-manager-delete-tag.component.css']
})
export class TagManagerDeleteTagComponent {
  selectedOption: string = ''; // Inicialmente no hay ninguna opción seleccionada
}
