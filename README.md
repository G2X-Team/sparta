<h1 style="font-family: serif" align="center">ΣΠΑΡΤΗ</h1>

<p align="center">
    <img src="https://i.pinimg.com/564x/ad/fb/0f/adfb0fd0aa639a744d71f462538e68f1.jpg" width="400px">
</p>

Sparta is a React UI/UX component library primarily developed by G2X with an emphasis on productivity and ease of use. This package uses [TSDX](https://www.npmjs.com/package/tsdx) for development, and extends the use of packages like [React Hook Form](https://react-hook-form.com/), and others for the purpose of providing a complete development experience.

# 🚀 Getting Started

Here is a quick setup of what you need to do to start contributing in Sparta.

```bash
# Install Node.js
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/G2X-Team/sparta sparta

# Run the setup script (One time command to install deps and husky)
yarn setup

# (Optional) run Storybook
yarn storybook

# (Optional) run Rollup TypeScript compiler
yarn start
```

## File Structure

To help guide your way around the repo, here is a quick breakdown of the file structure.

- **`example`:** contains a test application for integration testing components post-distribution processing.
- **`src`:** contains all source code including components and utilities.
    - **`components`:** contains all component folders
    - **`interfaces`:** contains all types & interfaces
    - **`util`:** contains all utility functions and classes
- **`stories`:** contains all `storybook` files for each component.
- **`test`:** contains all unit testing done through Jest and `@testing-library`.

### Breakdown

```Markdown
sparta
├───example
│   └───Testing environment for component implementation
│
├───src
│   ├───*components*
│   │   └───Component folders
│   │       ├───*components* contains abstracted components
│   │       ├───*overload* contains overloaded components
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
# 🤔 Have suggestions?

Feel free to use the [Issues](https://github.com/G2X-Team/sparta/issues) tab on the repo to voice any questions or concerns about the codebase.

# Documentation
Coming soon
