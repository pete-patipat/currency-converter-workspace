import { Component } from '@angular/core';
import { UsdInputComponent } from './usd-input/usd-input.component';
import { YenInputComponent } from './yen-input/yen-input.component';

@Component({
  selector: 'app-root',
  imports: [UsdInputComponent, YenInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  title = "Currency Converter";

  // These properties will hold the current values for each currency.
  yenValue: number | null = null;
  usdValue: number | null = null;

  /**
   * This method should be called when the USD value changes.
   * It needs to convert the new USD value to JPY and update the state.
   * @param value The new value from the USD input field.
   */
  onUsdChange(value: string) {
    // 1. Parse the incoming string 'value' to a number.
    if (value === '' || value === null) {
      // 4. If the input is empty or invalid, reset both values.
      this.usdValue = null;
      this.yenValue = null;
    } else {
      const usdAmount = parseFloat(value);
      // 2. If it's a valid number, convert it to Yen.
      if (!isNaN(usdAmount)) {
        // 3. Update both `this.usdValue` and `this.yenValue`.
        this.usdValue = usdAmount;
        this.yenValue = this.toYen(usdAmount);
      }
    }
    console.log('USD value changed:', value);
  }

  /**
   * This method should be called when the JPY value changes.
   * It needs to convert the new JPY value to USD and update the state.
   * @param value The new value from the JPY input field.
   */
  onYenChange(value: string) {
    // 1. Parse the incoming string 'value' to a number.
    if (value === '' || value === null) {
      // 4. If the input is empty or invalid, reset both values.
      this.yenValue = null;
      this.usdValue = null;
    } else {
      const yenAmount = parseFloat(value);
      // 2. If it's a valid number, convert it to USD.
      if (!isNaN(yenAmount)) {
        // 3. Update both `this.yenValue` and `this.usdValue`.
        this.yenValue = yenAmount;
        this.usdValue = this.toUsd(yenAmount);
      }
    }
    console.log('Yen value changed:', value);
  }

  // Helper methods for the conversions.
  private toYen(usd: number): number {
    // 1 USD = 110 JPY
    return usd * 110;
  }

  private toUsd(yen: number): number {
    // 1 JPY = 0.009 USD
    return yen * 0.009;
  }
}

