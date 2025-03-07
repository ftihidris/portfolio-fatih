import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  templateUrl: './toggle-button.component.html',
  imports: [CommonModule],
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {
  @Input() options: string[][] = [];
  @Input() selectedOption: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  toggleSelection(option: string): void {
    this.selectionChange.emit(option);
  }
}
