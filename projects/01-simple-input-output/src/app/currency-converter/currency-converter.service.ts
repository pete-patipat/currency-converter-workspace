import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  // Conversion rates as constants
  private readonly USD_TO_JPY_RATE = 110;
  private readonly CURRENCY_DECIMAL_PLACES = 2;

  /**
   * Convert USD amount to JPY
   * @param usd Amount in USD
   * @returns Amount in JPY rounded to 2 decimal places
   */
  convertUsdToJpy(usd: number): number {
    const result = usd * this.USD_TO_JPY_RATE;
    // Round to specified decimal places for currency precision
    const multiplier = Math.pow(10, this.CURRENCY_DECIMAL_PLACES);
    return Math.round(result * multiplier) / multiplier;
  }

  /**
   * Convert JPY amount to USD with floating-point precision fix
   * @param jpy Amount in JPY
   * @returns Amount in USD rounded to 2 decimal places
   */
  convertJpyToUsd(jpy: number): number {
    // Use division instead of multiplication to avoid floating-point precision issues
    // 1 JPY = 1/110 USD (more precise than multiplying by 0.009)
    const result = jpy / this.USD_TO_JPY_RATE;

    // Round to specified decimal places for currency precision
    const multiplier = Math.pow(10, this.CURRENCY_DECIMAL_PLACES);
    return Math.round(result * multiplier) / multiplier;
  }

  /**
   * Get the USD to JPY conversion rate
   * @returns The conversion rate
   */
  getUsdToJpyRate(): number {
    return this.USD_TO_JPY_RATE;
  }

  /**
   * Get the number of decimal places used for currency calculations
   * @returns Number of decimal places
   */
  getCurrencyDecimalPlaces(): number {
    return this.CURRENCY_DECIMAL_PLACES;
  }

  /**
   * Validate if a number is a valid currency amount
   * @param value The value to validate
   * @returns True if valid, false otherwise
   */
  isValidCurrencyAmount(value: number): boolean {
    return !isNaN(value) && value >= 0 && isFinite(value);
  }
}
