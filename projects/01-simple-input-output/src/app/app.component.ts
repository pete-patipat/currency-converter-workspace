import { Component, inject } from '@angular/core';
import { UsdInputComponent } from './usd-input/usd-input.component';
import { YenInputComponent } from './yen-input/yen-input.component';
import { CurrencyConverterService } from './currency-converter';

@Component({
  selector: 'app-root',
  imports: [UsdInputComponent, YenInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  title = "Currency Converter";

  // Inject the currency converter service
  private currencyService = inject(CurrencyConverterService);

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
      if (this.currencyService.isValidCurrencyAmount(usdAmount)) {
        // 3. Update both `this.usdValue` and `this.yenValue`.
        this.usdValue = usdAmount;
        this.yenValue = this.currencyService.convertUsdToJpy(usdAmount);
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
      if (this.currencyService.isValidCurrencyAmount(yenAmount)) {
        // 3. Update both `this.yenValue` and `this.usdValue`.
        this.yenValue = yenAmount;
        this.usdValue = this.currencyService.convertJpyToUsd(yenAmount);
      }
    }
    console.log('Yen value changed:', value);
  }
}

