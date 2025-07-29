# Angular: Currency Converter

Certain core Angular functionalities for an application that converts between Japanese Yen and US dollars are implemented. Complete the Angular application as shown to pass the unit tests.

## Assignment Description

The application has the following functionalities:

### Components

There are 2 components:

- The **UsdValue** component has a textbox to type/show the value in US Dollars.
- The **YenValue** component has a textbox to type/show the value in Japanese Yen.

### Required Actions

It should support these actions:

1. Enter the value in UsdValue textbox to convert it into Japanese Yen and render it correctly in the YenValue textbox
2. Delete text from either textbox
3. Enter the value in the YenValue textbox to convert it into US Dollars and render it correctly in the UsdValue textbox

Tests use only valid numeric inputs and show all decimal points.

### Currency Conversion Rates

| Japanese Yen | US Dollar |
|--------------|-----------|
| 1            | 0.009     |
| 110          | 1         |

### Required Data Attributes

The following data-test-id attributes are required in the component for the tests to pass:

- The UsdValue textbox should have the data-test-id attribute `'usd-value'`
- The YenValue textbox should have the data-test-id attribute `'yen-value'`

**Note:** The component has these data-test-id attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.

## Project Structure

The project follows Angular best practices with a clean component-based architecture:

```
projects/00-assignment-template/src/app/
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

### Architecture Overview

- **Main App Component** (`app.component.ts`): Contains the currency conversion logic and manages state
- **USD Input Component** (`usd-input/`): Handles USD input and emits value changes
- **YEN Input Component** (`yen-input/`): Handles JPY input and emits value changes
- **Separation of Concerns**: Each component has its own template, styles, and tests
- **Event Binding**: Parent-child communication using `@Input()` and `@Output()`

### Implementation Guidelines

To complete the assignment:

1. **Implement Conversion Logic**: Fill in the TODO sections in `app.component.ts`
2. **Currency Rates**: Use the specified conversion rates (1 USD = 110 JPY)
3. **Event Handling**: Ensure proper two-way data flow between components
4. **Input Validation**: Handle empty inputs and invalid numbers appropriately

## Development Setup

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
