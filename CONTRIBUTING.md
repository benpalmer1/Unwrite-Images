# Contributing to Unwrite Images

Thank you for your interest in contributing to Unwrite Images! This document provides guidelines for contributing to the project.

## Development Setup

1. **Prerequisites**
   - Node.js 16+ 
   - npm 7+
   - Git

2. **Clone and Install**
   ```bash
   git clone https://github.com/unwrite/unwrite-images.git
   cd unwrite-images
   npm install
   ```

3. **Development Commands**
   ```bash
   npm run dev     # Start development server
   npm run build   # Build for production
   npm run watch   # Watch mode for development
   ```

## Project Structure

- `/src` - Source code
  - `/client` - Client-side application code
  - `/shared` - Shared components and utilities
  - `/static-build` - Static site generation
  - `/worker-shared` - Web Worker shared code
- `/codecs` - Image codec implementations (WASM)
- `/lib` - Build utilities and plugins
- `/dist` - Build output (mount API)
- `/build` - Static site build output

## Pull Request Process

1. Fork the repository and create your branch from `dev`
2. Make your changes following the existing code style
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request to the `dev` branch

## Code Style

- Use TypeScript for new code
- Follow existing formatting (Prettier is configured)
- Keep changes minimal and focused

## Testing

Before submitting a PR:
1. Ensure `npm run build` completes without errors
2. Test the app locally with `npm run dev`
3. Verify image processing works correctly
4. Check that the mount API works as expected

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.

## Questions?

Feel free to open an issue for any questions or concerns about contributing.