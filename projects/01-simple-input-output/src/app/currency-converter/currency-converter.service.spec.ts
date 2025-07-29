import { TestBed } from '@angular/core/testing';
import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertUsdToJpy', () => {
    it('should convert 1 USD to 110 JPY', () => {
      const result = service.convertUsdToJpy(1);
      expect(result).toBe(110);
    });

    it('should convert 0 USD to 0 JPY', () => {
      const result = service.convertUsdToJpy(0);
      expect(result).toBe(0);
    });

    it('should convert decimal USD values correctly', () => {
      const result = service.convertUsdToJpy(1.5);
      expect(result).toBe(165); // 1.5 * 110
    });

    it('should handle large amounts', () => {
      const result = service.convertUsdToJpy(1000000);
      expect(result).toBe(110000000); // 1,000,000 * 110
    });

    it('should handle very small amounts', () => {
      const result = service.convertUsdToJpy(0.01);
      expect(result).toBe(1.1); // 0.01 * 110
    });
  });

  describe('convertJpyToUsd', () => {
    it('should convert 110 JPY to exactly 1.00 USD (floating-point precision fix)', () => {
      const result = service.convertJpyToUsd(110);
      expect(result).toBe(1.00);
      expect(result).not.toBe(0.9899999999999999); // Ensure no precision issues
    });

    it('should convert 0 JPY to 0 USD', () => {
      const result = service.convertJpyToUsd(0);
      expect(result).toBe(0);
    });

    it('should round to 2 decimal places', () => {
      const result = service.convertJpyToUsd(333); // 333 / 110 = 3.027272...
      expect(result).toBe(3.03);
    });

    it('should handle decimal JPY values correctly', () => {
      const result = service.convertJpyToUsd(550.50); // 550.50 / 110 = 5.004545...
      expect(result).toBe(5.00); // Should round to 5.00
    });

    it('should handle large amounts', () => {
      const result = service.convertJpyToUsd(11000000);
      expect(result).toBe(100000.00); // 11,000,000 / 110 = 100,000
    });

    it('should handle very small amounts', () => {
      const result = service.convertJpyToUsd(1.1);
      expect(result).toBe(0.01); // 1.1 / 110 = 0.01
    });

    it('should maintain precision for common currency amounts', () => {
      const testCases = [
        { jpy: 550, usd: 5.00 },
        { jpy: 1100, usd: 10.00 },
        { jpy: 2750, usd: 25.00 },
        { jpy: 11000, usd: 100.00 }
      ];

      testCases.forEach(testCase => {
        const result = service.convertJpyToUsd(testCase.jpy);
        expect(result).toBe(testCase.usd);
      });
    });
  });

  describe('getUsdToJpyRate', () => {
    it('should return the correct conversion rate', () => {
      const rate = service.getUsdToJpyRate();
      expect(rate).toBe(110);
    });
  });

  describe('getCurrencyDecimalPlaces', () => {
    it('should return the correct number of decimal places', () => {
      const decimalPlaces = service.getCurrencyDecimalPlaces();
      expect(decimalPlaces).toBe(2);
    });
  });

  describe('isValidCurrencyAmount', () => {
    it('should return true for valid positive numbers', () => {
      expect(service.isValidCurrencyAmount(1)).toBe(true);
      expect(service.isValidCurrencyAmount(100.50)).toBe(true);
      expect(service.isValidCurrencyAmount(0)).toBe(true);
      expect(service.isValidCurrencyAmount(0.01)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(service.isValidCurrencyAmount(NaN)).toBe(false);
    });

    it('should return false for negative numbers', () => {
      expect(service.isValidCurrencyAmount(-1)).toBe(false);
      expect(service.isValidCurrencyAmount(-100.50)).toBe(false);
    });

    it('should return false for infinite values', () => {
      expect(service.isValidCurrencyAmount(Infinity)).toBe(false);
      expect(service.isValidCurrencyAmount(-Infinity)).toBe(false);
    });
  });

  describe('Bidirectional conversion consistency', () => {
    it('should maintain consistency when converting back and forth', () => {
      const originalUsd = 25.75;

      // USD -> JPY -> USD
      const jpy = service.convertUsdToJpy(originalUsd);
      const backToUsd = service.convertJpyToUsd(jpy);

      // Should be very close (allowing for rounding)
      expect(Math.abs(backToUsd - originalUsd)).toBeLessThan(0.01);
    });

    it('should handle the problematic precision case bidirectionally', () => {
      // Start with 1 USD
      const originalUsd = 1;
      const jpy = service.convertUsdToJpy(originalUsd); // Should be 110
      const backToUsd = service.convertJpyToUsd(jpy); // Should be exactly 1.00

      expect(jpy).toBe(110);
      expect(backToUsd).toBe(1.00);
      expect(backToUsd).not.toBe(0.9899999999999999);
    });
  });

  describe('Floating-point precision edge cases', () => {
    it('should handle cases that previously caused precision issues', () => {
      // Test specific values that could cause floating-point issues
      const problematicValues = [110, 220, 330, 1100, 2200];

      problematicValues.forEach(jpy => {
        const usd = service.convertJpyToUsd(jpy);
        // Result should always have at most 2 decimal places
        const decimalPlaces = (usd.toString().split('.')[1] || '').length;
        expect(decimalPlaces).toBeLessThanOrEqual(2);

        // Result should be a clean number (no floating-point artifacts)
        expect(Number.isFinite(usd)).toBe(true);
        expect(usd).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
