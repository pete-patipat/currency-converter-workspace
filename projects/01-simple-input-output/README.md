# Currency Converter - Structured Implementation

This is the **01-simple-input-output** project that now demonstrates a complete structured Angular component architecture for currency conversion between USD and JPY.

## Project Structure

The project follows Angular best practices with a clean component-based architecture:

```
src/app/
├── app.component.ts                # Main app component with conversion logic
├── app.component.html              # Main app template
├── app.component.scss              # Main app styles
├── app.config.ts                   # App configuration
├── app.routes.ts                   # App routing
├── app.spec.ts                     # App tests
├── usd-input/                      # USD Input Component
│   ├── usd-input.component.ts      # USD component logic
│   ├── usd-input.html              # USD component template
│   ├── usd-input.scss              # USD component styles
│   └── usd-input.component.spec.ts # USD component tests
└── yen-input/                      # YEN Input Component
    ├── yen-input.component.ts      # YEN component logic
    ├── yen-input.html              # YEN component template
    ├── yen-input.scss              # YEN component styles
    └── yen-input.component.spec.ts # YEN component tests
```

## Architecture Overview

### Component Structure
- **Main App Component** (`app.component.ts`): Contains the currency conversion logic and manages state
- **USD Input Component** (`usd-input/`): Handles USD input and emits value changes
- **YEN Input Component** (`yen-input/`): Handles JPY input and emits value changes

### Key Features
- **Separation of Concerns**: Each component has its own template, styles, and tests
- **Event Binding**: Parent-child communication using `@Input()` and `@Output()`
- **Type Safety**: Full TypeScript support with proper typing
- **Test Coverage**: Comprehensive unit tests for each component

### Data Flow
1. User types in USD input → USD component emits value → App component converts to JPY → YEN component displays result
2. User types in JPY input → YEN component emits value → App component converts to USD → USD component displays result

## Currency Conversion

### Conversion Rates
- **1 USD = 110 JPY**
- **1 JPY = 0.009 USD**

### Precision Handling
To avoid JavaScript floating-point precision issues (e.g., `110 * 0.009 = 0.9899999999999999`), the JPY to USD conversion uses division instead of multiplication:

```typescript
// Instead of: yen * 0.009 (causes precision issues)
// We use: yen / 110 (more precise)
private toUsd(yen: number): number {
  return Math.round((yen / 110) * 100) / 100;
}
```

This ensures that:
- **110 JPY → 1.00 USD** (not 0.9899999999999999)
- Results are rounded to 2 decimal places for currency precision

### Required Data Attributes
- USD input: `data-test-id="usd-value"`
- JPY input: `data-test-id="yen-value"`

## Running the Project

To run this specific project:

```bash
# From the workspace root
ng serve 01-simple-input-output

# Or with custom port
ng serve 01-simple-input-output --port 4201
```

To run tests:

```bash
ng test 01-simple-input-output
```

## Implementation Notes

This project demonstrates:
- **Component Communication**: Parent-child data flow with events
- **Form Handling**: Number inputs with validation
- **State Management**: Centralized conversion logic
- **Testing**: Component testing with Jasmine/Karma
- **Best Practices**: Angular coding standards and project organization
- **Scalable Architecture**: Reusable components and clear separation of concerns

## Benefits of This Approach

### Ideal For:
- **Production Applications**: Scalable and maintainable code structure
- **Team Development**: Clear component boundaries for parallel development
- **Reusable Components**: Components can be used in other parts of the application
- **Testing**: Each component can be tested independently
- **Maintainability**: Easy to update and extend individual components

### Features:
- **Modular Design**: Components are self-contained and reusable
- **Type Safety**: Full TypeScript support with proper interfaces
- **Event-Driven**: Clean communication between parent and child components
- **Testable**: Comprehensive unit tests for all components
- **Professional**: Follows Angular style guide and best practices 
