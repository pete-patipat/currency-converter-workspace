import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usd-input',
  templateUrl: './usd-input.html',
  styleUrl: './usd-input.scss'
})
export class UsdInputComponent {
  // Receives the value to display from the parent component (AppComponent)
  @Input() value: number | null = null;

  // Emits an event to notify the parent when the user types in the input
  @Output() valueChanged = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.valueChanged.emit(newValue);
  }
}
