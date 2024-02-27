import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
})
export class TagManagerComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  selectedTab: string = 'Crear etiqueta'; // Inicialmente seleccionado

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
