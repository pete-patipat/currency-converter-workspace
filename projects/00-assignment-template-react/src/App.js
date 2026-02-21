import React, { useState } from 'react';
import CurrencyInput from './currency/currency';
import './App.css'; // Corrected import path after moving App.css to src/

const App = () => {
  const [usdValue, setUsdValue] = useState(null);
  const [yenValue, setYenValue] = useState(null);

  // Exchange rate constant
  const USD_TO_JPY_RATE = 110;
  const CURRENCY_DECIMAL_PLACES = 2;

  const handleUsdChange = (value) => {
    const numericValue = value === '' ? null : parseFloat(value);
    if (numericValue !== null && !isNaN(numericValue) && isFinite(numericValue)) {
      setUsdValue(numericValue);
      const result = value * USD_TO_JPY_RATE;
      const multiplier = Math.pow(10, CURRENCY_DECIMAL_PLACES);
      const roundedResult = Math.round(result * multiplier) / multiplier;
      setYenValue(roundedResult);
    } else {
      setUsdValue(null);
      setYenValue(null);
    }
  };

  const handleYenChange = (value) => {
    const numericValue = value === '' ? null : parseFloat(value);
    if (numericValue !== null && !isNaN(numericValue) && isFinite(numericValue)) {
      setYenValue(numericValue);
      const result = value / USD_TO_JPY_RATE;
      const multiplier = Math.pow(10, CURRENCY_DECIMAL_PLACES);
      const roundedResult = Math.round(result * multiplier) / multiplier;
      setUsdValue(roundedResult);
    } else {
      setYenValue(null);
      setUsdValue(null);
    }
  };

  return (
    <div className="currency-converter-container">
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
        Currency Converter
      </h2>

      <CurrencyInput
        label="US Dollar"
        placeholder="Enter USD"
        testId="usd-value"
        value={usdValue}
        onValueChange={handleUsdChange}
      />

      <CurrencyInput
        label="Japanese Yen"
        placeholder="Enter JPY"
        testId="yen-value"
        value={yenValue}
        onValueChange={handleYenChange}
      />
    </div>
  );
};

export default App;
