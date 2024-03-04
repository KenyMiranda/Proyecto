import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
})
export class TagManagerComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  selectedTab: string = 'Crear etiqueta'; // Inicialmente seleccionado
  popupWidth: number = 640; // Initial width of the popup
  popupHeight: number = 460; // Initial height of the popup
  isResizing: boolean = false;
  startX: number = 0;
  startY: number = 0;

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      event.preventDefault(); // Evita el comportamiento predeterminado del navegador
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) {
      return;
    }

    const deltaX = this.startX - event.clientX; // Invertir la dirección horizontal
    const deltaY = this.startY - event.clientY; // Invertir la dirección vertical

    // Calcula el cambio en el tamaño de la ventana emergente
    let newWidth = this.popupWidth + deltaX;
    let newHeight = this.popupHeight + deltaY;

    // Limita el tamaño máximo basado en el tamaño de la pantalla
    const maxWidth = window.innerWidth * 0.8; // Por ejemplo, el 80% del ancho de la pantalla
    const maxHeight = window.innerHeight * 0.8; // Por ejemplo, el 80% de la altura de la pantalla
    newWidth = Math.min(newWidth, maxWidth);
    newHeight = Math.min(newHeight, maxHeight);

    // Asegúrate de que la ventana emergente no se reduzca demasiado
    if (newWidth > 460 && newHeight > 380) {
      this.popupWidth = newWidth;
      this.popupHeight = newHeight;
    }

    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  closeTagManager() {
    this.close.emit();
  }

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  isTabSelected(tabName: string): boolean {
    return this.selectedTab === tabName;
  }
}