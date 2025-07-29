import { TestBed } from '@angular/core/testing';
import { App } from './app.component';

describe('AppComponent', () => {
  let component: App;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Currency Converter');
  });

  it('should render title in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Currency Converter');
  });

  // Precision Fix Tests
  describe('Floating-Point Precision Fix', () => {
    it('should convert 110 JPY to exactly 1.00 USD (not 0.9899999999999999)', () => {
      // Test the specific case that was problematic
      component.onYenChange('110');

      expect(component.yenValue).toBe(110);
      expect(component.usdValue).toBe(1.00);
      expect(component.usdValue).not.toBe(0.9899999999999999);
    });

    it('should convert 1 USD to 110 JPY', () => {
      component.onUsdChange('1');

      expect(component.usdValue).toBe(1);
      expect(component.yenValue).toBe(110);
    });

    it('should round JPY to USD conversion to 2 decimal places', () => {
      // Test cases that would produce more than 2 decimal places
      component.onYenChange('333'); // 333 / 110 = 3.027272...

      expect(component.yenValue).toBe(333);
      expect(component.usdValue).toBe(3.03); // Should be rounded to 2 decimal places
    });

    it('should handle zero values correctly', () => {
      component.onUsdChange('0');

      expect(component.usdValue).toBe(0);
      expect(component.yenValue).toBe(0);
    });

    it('should handle decimal USD values correctly', () => {
      component.onUsdChange('1.50');

      expect(component.usdValue).toBe(1.50);
      expect(component.yenValue).toBe(165); // 1.50 * 110
    });

        it('should handle decimal JPY values correctly', () => {
      component.onYenChange('550.50');

      expect(component.yenValue).toBe(550.50);
      expect(component.usdValue).toBe(5.00); // 550.50 / 110 = 5.004545... rounded to 5.00
    });
  });

  describe('Input Validation', () => {
    it('should reset both values when USD input is empty', () => {
      // Set initial values
      component.usdValue = 1;
      component.yenValue = 110;

      // Clear USD input
      component.onUsdChange('');

      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });

    it('should reset both values when JPY input is empty', () => {
      // Set initial values
      component.usdValue = 1;
      component.yenValue = 110;

      // Clear JPY input
      component.onYenChange('');

      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });

    it('should handle invalid USD input gracefully', () => {
      component.onUsdChange('invalid');

      // Should not update values for invalid input
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });

    it('should handle invalid JPY input gracefully', () => {
      component.onYenChange('invalid');

      // Should not update values for invalid input
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });
  });

  describe('Conversion Logic Edge Cases', () => {
    it('should handle very large numbers', () => {
      component.onUsdChange('1000000');

      expect(component.usdValue).toBe(1000000);
      expect(component.yenValue).toBe(110000000); // 1,000,000 * 110
    });

    it('should handle very small decimal numbers', () => {
      component.onUsdChange('0.01');

      expect(component.usdValue).toBe(0.01);
      expect(component.yenValue).toBe(1.1); // 0.01 * 110
    });

    it('should maintain precision for common currency amounts', () => {
      const testCases = [
        { usd: 5, jpy: 550 },
        { usd: 10, jpy: 1100 },
        { usd: 25, jpy: 2750 },
        { usd: 100, jpy: 11000 }
      ];

      testCases.forEach(testCase => {
        // Test USD to JPY
        component.onUsdChange(testCase.usd.toString());
        expect(component.usdValue).toBe(testCase.usd);
        expect(component.yenValue).toBe(testCase.jpy);

        // Test JPY to USD
        component.onYenChange(testCase.jpy.toString());
        expect(component.yenValue).toBe(testCase.jpy);
        expect(component.usdValue).toBe(testCase.usd);
      });
    });
  });
});
