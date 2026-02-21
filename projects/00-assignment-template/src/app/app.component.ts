import { Component } from '@angular/core';
import { YenInputComponent } from "./yen-input/yen-input.component";
import { UsdInputComponent } from "./usd-input/usd-input.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [YenInputComponent, UsdInputComponent]
})
export class AppComponent {
  title = "Currency Converter";

  // These properties will hold the current values for each currency.
  // You will need to update them during conversion.
  yenValue: number | null = null;
  usdValue: number | null = null;

  /**
   * This method should be called when the USD value changes.
   * It needs to convert the new USD value to JPY and update the state.
   * @param value The new value from the USD input field.
   */
  onUsdChange(value: string) {
    // TODO: Implement the logic to handle USD input changes.
    // 1. Parse the incoming string 'value' to a number.
    // 2. If it's a valid number, convert it to Yen.
    // 3. Update both `this.usdValue` and `this.yenValue`.
    // 4. If the input is empty or invalid, reset both values.
    console.log('USD value changed:', value);
  }

  /**
   * This method should be called when the JPY value changes.
   * It needs to convert the new JPY value to USD and update the state.
   * @param value The new value from the JPY input field.
   */
  onYenChange(value: string) {
    // TODO: Implement the logic to handle JPY input changes.
    // 1. Parse the incoming string 'value' to a number.
    // 2. If it's a valid number, convert it to USD.
    // 3. Update both `this.yenValue` and `this.usdValue`.
    // 4. If the input is empty or invalid, reset both values.
    console.log('Yen value changed:', value);
  }
}
