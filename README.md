# Apollo Component Library (WIP)

## What is it?
Apollo is a component library primarily developed by MileMarker10 to facilitate the creation of Frontend UI components whilst reducing the amount of code that needs to be written.

## Starting it
When developing components, we always want two things constantly running. The rollup environment and Storybook. In order to have that available to us we will want to

```bash
# To start rollup and compile TypeScript
$ yarn start
# or
$ npm start

# To start Storybook
$ yarn storybook
# or
$ npm run storybook
```

## File Structure
The file structure is laid out as follows:
- **`example`:** contains a test application for integration testing components post-distribution processing.
- **`src`:** contains all source code including components and utilities.
- **`stories`:** contains all `storybook` files for each component.
- **`test`:** contains all unit testing done through Jest and `@testing-library`.

### Breakdown

```Markdown
apollo-component-library
├───example
│   └───Testing environment for component implementation
│
├───src
│   ├───components
│   │   └───Component folders
│   │       └───Component Files
│   │
│   │───*interfaces*
│   │   └───Types and interfaces
│   │
│   └───*util*
│       └───Utility classes and functions
│
├───stories
│   └───Storybook testing files
│
└───test
    └───Jest testing files
```
