import { Component, OnInit, HostListener } from '@angular/core';
import { MaterialesServicesService } from 'src/app/services/materiales/materiales-services.service';

@Component({
  selector: 'app-tag-manager-assign-tags',
  templateUrl: './tag-manager-assign-tags.component.html',
  styleUrls: ['./tag-manager-assign-tags.component.css']
})
export class TagManagerAssignTagsComponent implements OnInit{
  optionSelected: boolean = false;
  atLeastOneChecked: boolean = false;
  numOptions: number = 0;
  arrayFiles: any[] = []; 
  filteredFiles: any[] = [];
  searchTerm: string = '';

  constructor(private materialesService: MaterialesServicesService) {}

  onSelectOption() {
    this.optionSelected = true;
    this.checkIfChecked();
  }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.materialesService.getFiles().subscribe(
      (files) => {
        this.arrayFiles = files;
        // Inicialmente, mostrar todos los archivos sin filtrar
        this.filteredFiles = [...this.arrayFiles];
        // Verificar si hay al menos un archivo seleccionado
        this.checkIfChecked();
      },
      (err) => console.error(err)
    );
  }

  // Método para verificar si hay al menos un archivo seleccionado
  checkIfChecked() {
    const checkedCheckboxes = this.arrayFiles.filter(file => file.checked);
    this.atLeastOneChecked = checkedCheckboxes.length > 0;
  }

  // Método para filtrar archivos según la consulta de búsqueda
  filterFiles(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query.trim() === '') {
      // Si la consulta está vacía, mostrar todos los archivos sin filtrar
      this.filteredFiles = [...this.arrayFiles];
    } else {
      // Filtrar archivos que coincidan con la consulta
      this.filteredFiles = this.arrayFiles.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }  
}
