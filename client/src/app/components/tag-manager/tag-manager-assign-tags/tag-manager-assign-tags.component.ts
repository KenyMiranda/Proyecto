import { Component, OnInit, HostListener } from '@angular/core';
import { MaterialesServicesService } from 'src/app/services/materiales/materiales-services.service';

@Component({
  selector: 'app-tag-manager-assign-tags',
  templateUrl: './tag-manager-assign-tags.component.html',
  styleUrls: ['./tag-manager-assign-tags.component.css'],
})
export class TagManagerAssignTagsComponent implements OnInit {
  optionSelected: boolean = false;
  atLeastOneChecked: boolean = false;
  numOptions: number = 0;
  arrayFiles: any[] = [];
  filteredFiles: any[] = [];
  searchTerm: string = '';
  selectedFileType: string | null = null;

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
    const checkedCheckboxes = this.arrayFiles.filter((file) => file.checked);
    this.atLeastOneChecked = checkedCheckboxes.length > 0;
  }

  // Método para filtrar archivos según la consulta de búsqueda y el tipo de archivo seleccionado
  filterFiles(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters(query);
  }

  // Método para filtrar archivos por tipo de archivo seleccionado
  filterByFileType(event: Event) {
    const selectedFileType = (event.target as HTMLSelectElement).value;
    this.selectedFileType = selectedFileType;
    this.applyFilters(this.searchTerm);
  }
  
  applyFilters(query: string) {
    if (query.trim() === '') {
      // Si la consulta está vacía, mostrar todos los archivos sin filtrar
      if (this.selectedFileType) {
        const fileExtensions = this.getFileExtension(this.selectedFileType);
        if (fileExtensions) {
          const extensions = fileExtensions.split(','); // Separar las extensiones por coma
          this.filteredFiles = this.arrayFiles.filter(file =>
            extensions.some(extension =>
              file.name.toLowerCase().endsWith(`.${extension}`)
            )
          );
        }
      } else {
        this.filteredFiles = [...this.arrayFiles];
      }
    } else {
      // Filtrar archivos que coincidan con la consulta y el tipo de archivo seleccionado
      if (this.selectedFileType) {
        const fileExtensions = this.getFileExtension(this.selectedFileType);
        if (fileExtensions) {
          const extensions = fileExtensions.split(','); // Separar las extensiones por coma
          this.filteredFiles = this.arrayFiles.filter(file =>
            extensions.some(extension =>
              file.name.toLowerCase().endsWith(`.${extension}`) &&
              file.name.toLowerCase().includes(query)
            )
          );
        }
      } else {
        this.filteredFiles = this.arrayFiles.filter(file =>
          file.name.toLowerCase().includes(query)
        );
      }
    }
  }  
  
  getFileExtension(fileType: string): string | null {
    switch (fileType) {
      case 'Documento Word':
        return 'docx';
      case 'PDF':
        return 'pdf';
      case 'Audio':
        return 'mp3';
      case 'Video':
        return 'mp4';
      case 'PowerPoint':
        return 'pptx';
      case 'Imagen':
        return 'jpg,png';
      default:
        return null;
    }
  }  
}