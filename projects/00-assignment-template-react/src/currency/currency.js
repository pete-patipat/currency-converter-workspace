import React from 'react';

const CurrencyInput = ({ label, value, onValueChange, testId, placeholder }) => {
  return (
    <div className="input-group">
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
        {label}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        data-test-id={testId}
        value={value === null ? '' : value}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '1rem',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default CurrencyInput;
