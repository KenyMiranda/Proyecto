import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css']
})
export class TagManagerComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeTagManager() {
    this.close.emit();
  }
}
