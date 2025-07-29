# Currency Converter - Structured Implementation

This is the **01-simple-input-output** project that now demonstrates a complete structured Angular component architecture for currency conversion between USD and JPY.

## Project Structure

The project follows Angular best practices with a clean component-based architecture:

```
src/app/
├── app.component.ts                # Main app component (UI logic only)
├── app.component.html              # Main app template
├── app.component.scss              # Main app styles
├── app.config.ts                   # App configuration
├── app.routes.ts                   # App routing
├── app.spec.ts                     # App tests
├── currency-converter/             # Currency Converter Module
│   ├── currency-converter.service.ts     # Currency conversion business logic
│   ├── currency-converter.service.spec.ts # Service unit tests
│   └── index.ts                          # Barrel export for clean imports
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
- **Main App Component** (`app.component.ts`): Manages UI state and delegates conversion logic to service
- **Currency Converter Module** (`currency-converter/`): Self-contained module with conversion logic
  - **Currency Converter Service** (`currency-converter.service.ts`): Encapsulates conversion rates and business logic
- **USD Input Component** (`usd-input/`): Handles USD input and emits value changes
- **YEN Input Component** (`yen-input/`): Handles JPY input and emits value changes

### Key Features
- **Separation of Concerns**: Each component has its own template, styles, and tests
- **Service-Based Architecture**: Business logic isolated in reusable service
- **Event Binding**: Parent-child communication using `@Input()` and `@Output()`
- **Type Safety**: Full TypeScript support with proper typing
- **Test Coverage**: Comprehensive unit tests for components and services
- **Dependency Injection**: Clean service injection using Angular's DI system

### Service Architecture

The application follows a service-based architecture pattern:

**Currency Converter Module** (`currency-converter/`):
- Self-contained module organizing currency conversion functionality
- **Barrel Export** (`index.ts`): Provides clean import syntax
- **CurrencyConverterService** (`currency-converter.service.ts`):
  - Encapsulates all conversion rates and business logic
  - Provides methods: `convertUsdToJpy()`, `convertJpyToUsd()`, `isValidCurrencyAmount()`
  - Handles floating-point precision issues with proper rounding
  - Injectable service with `providedIn: 'root'` for singleton behavior
  - Fully unit tested in isolation

**Usage Example:**
```typescript
// Clean import using barrel export
import { CurrencyConverterService } from './currency-converter';

// Inject service
private currencyService = inject(CurrencyConverterService);

// Use service methods
const jpy = this.currencyService.convertUsdToJpy(1); // Returns 110
const usd = this.currencyService.convertJpyToUsd(110); // Returns 1.00
```

**Benefits of Modular Service Architecture**:
- **Reusability**: Service can be used across multiple components
- **Testability**: Business logic tested separately from UI logic
- **Maintainability**: Rate changes only require service updates
- **Organization**: Related files grouped in dedicated modules
- **Single Responsibility**: Components focus on UI, service handles conversions
- **Scalability**: Easy to extend with additional currency-related features

### Data Flow
1. User types in USD input → USD component emits value → App component calls service → Service converts to JPY → YEN component displays result
2. User types in JPY input → YEN component emits value → App component calls service → Service converts to USD → USD component displays result

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
- **Service Architecture**: Business logic separation using dependency injection
- **Form Handling**: Number inputs with validation
- **State Management**: UI state managed by components, business logic by services
- **Testing**: Comprehensive testing with mocked dependencies
- **Best Practices**: Angular coding standards and project organization
- **Scalable Architecture**: Reusable components and services with clear separation of concerns

## Benefits of This Approach

### Ideal For:
- **Production Applications**: Scalable and maintainable code structure
- **Team Development**: Clear component boundaries for parallel development
- **Reusable Components**: Components can be used in other parts of the application
- **Testing**: Each component can be tested independently
- **Maintainability**: Easy to update and extend individual components

### Features:
- **Modular Design**: Components and services are self-contained and reusable
- **Service Layer**: Business logic encapsulated in injectable services
- **Type Safety**: Full TypeScript support with proper interfaces
- **Event-Driven**: Clean communication between parent and child components
- **Testable**: Comprehensive unit tests with proper mocking and isolation
- **Dependency Injection**: Leverages Angular's DI system for clean architecture
- **Professional**: Follows Angular style guide and best practices 
