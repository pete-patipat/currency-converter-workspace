import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { CurrencyConverterService } from './currency-converter';

describe('AppComponent', () => {
  let component: App;
  let fixture: any;
  let mockCurrencyService: jasmine.SpyObj<CurrencyConverterService>;

  beforeEach(async () => {
    // Create a spy object for the CurrencyConverterService
    mockCurrencyService = jasmine.createSpyObj('CurrencyConverterService', [
      'convertUsdToJpy',
      'convertJpyToUsd',
      'isValidCurrencyAmount'
    ]);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: CurrencyConverterService, useValue: mockCurrencyService }
      ]
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

  describe('USD Input Changes', () => {
    it('should call currency service and update values when USD input is valid', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertUsdToJpy.and.returnValue(110);

      // Act
      component.onUsdChange('1');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(1);
      expect(mockCurrencyService.convertUsdToJpy).toHaveBeenCalledWith(1);
      expect(component.usdValue).toBe(1);
      expect(component.yenValue).toBe(110);
    });

    it('should reset values when USD input is empty', () => {
      // Arrange
      component.usdValue = 1;
      component.yenValue = 110;

      // Act
      component.onUsdChange('');

      // Assert
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
      expect(mockCurrencyService.isValidCurrencyAmount).not.toHaveBeenCalled();
      expect(mockCurrencyService.convertUsdToJpy).not.toHaveBeenCalled();
    });

    it('should not update values when USD input is invalid', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(false);
      component.usdValue = null;
      component.yenValue = null;

      // Act
      component.onUsdChange('invalid');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(NaN);
      expect(mockCurrencyService.convertUsdToJpy).not.toHaveBeenCalled();
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });

    it('should handle decimal USD values', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertUsdToJpy.and.returnValue(165);

      // Act
      component.onUsdChange('1.50');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(1.5);
      expect(mockCurrencyService.convertUsdToJpy).toHaveBeenCalledWith(1.5);
      expect(component.usdValue).toBe(1.5);
      expect(component.yenValue).toBe(165);
    });
  });

  describe('JPY Input Changes', () => {
    it('should call currency service and update values when JPY input is valid', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertJpyToUsd.and.returnValue(1.00);

      // Act
      component.onYenChange('110');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(110);
      expect(mockCurrencyService.convertJpyToUsd).toHaveBeenCalledWith(110);
      expect(component.yenValue).toBe(110);
      expect(component.usdValue).toBe(1.00);
    });

    it('should reset values when JPY input is empty', () => {
      // Arrange
      component.usdValue = 1;
      component.yenValue = 110;

      // Act
      component.onYenChange('');

      // Assert
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
      expect(mockCurrencyService.isValidCurrencyAmount).not.toHaveBeenCalled();
      expect(mockCurrencyService.convertJpyToUsd).not.toHaveBeenCalled();
    });

    it('should not update values when JPY input is invalid', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(false);
      component.usdValue = null;
      component.yenValue = null;

      // Act
      component.onYenChange('invalid');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(NaN);
      expect(mockCurrencyService.convertJpyToUsd).not.toHaveBeenCalled();
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
    });

    it('should handle decimal JPY values', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertJpyToUsd.and.returnValue(5.00);

      // Act
      component.onYenChange('550.50');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(550.5);
      expect(mockCurrencyService.convertJpyToUsd).toHaveBeenCalledWith(550.5);
      expect(component.yenValue).toBe(550.5);
      expect(component.usdValue).toBe(5.00);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertUsdToJpy.and.returnValue(0);

      // Act
      component.onUsdChange('0');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(0);
      expect(mockCurrencyService.convertUsdToJpy).toHaveBeenCalledWith(0);
      expect(component.usdValue).toBe(0);
      expect(component.yenValue).toBe(0);
    });

    it('should handle large numbers', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(true);
      mockCurrencyService.convertUsdToJpy.and.returnValue(110000000);

      // Act
      component.onUsdChange('1000000');

      // Assert
      expect(mockCurrencyService.isValidCurrencyAmount).toHaveBeenCalledWith(1000000);
      expect(mockCurrencyService.convertUsdToJpy).toHaveBeenCalledWith(1000000);
      expect(component.usdValue).toBe(1000000);
      expect(component.yenValue).toBe(110000000);
    });

    it('should handle null input correctly', () => {
      // Arrange
      component.usdValue = 100;
      component.yenValue = 11000;

      // Act
      component.onUsdChange(null as any);

      // Assert
      expect(component.usdValue).toBeNull();
      expect(component.yenValue).toBeNull();
      expect(mockCurrencyService.isValidCurrencyAmount).not.toHaveBeenCalled();
    });
  });

  describe('Service Integration', () => {
    it('should not call conversion methods when validation fails', () => {
      // Arrange
      mockCurrencyService.isValidCurrencyAmount.and.returnValue(false);

      // Act
      component.onUsdChange('invalid');
      component.onYenChange('invalid');

      // Assert
      expect(mockCurrencyService.convertUsdToJpy).not.toHaveBeenCalled();
      expect(mockCurrencyService.convertJpyToUsd).not.toHaveBeenCalled();
    });

    it('should preserve the original service behavior for the precision fix case', () => {
      // This is an integration test that verifies the service handles the precision fix
      // but uses the real service instead of mocking
      const realService = new CurrencyConverterService();

      // The problematic case: 110 JPY should convert to exactly 1.00 USD
      const result = realService.convertJpyToUsd(110);
      expect(result).toBe(1.00);
      expect(result).not.toBe(0.9899999999999999);
    });
  });
});
