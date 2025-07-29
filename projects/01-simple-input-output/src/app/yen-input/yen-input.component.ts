import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-yen-input',
  templateUrl: './yen-input.html',
  styleUrl: './yen-input.scss'
})
export class YenInputComponent {
  // Receives the value to display from the parent component (AppComponent)
  @Input() value: number | null = null;

  // Emits an event to notify the parent when the user types in the input
  @Output() valueChanged = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.valueChanged.emit(newValue);
  }
}
