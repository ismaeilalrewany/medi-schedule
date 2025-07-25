# Code Formatting & Style Guide

## Overview

This project uses **Prettier** for code formatting and **ESLint** for code quality, configured at the root level to ensure consistency across both frontend and backend code.

## Tools Used

- **Prettier**: Automatic code formatting
- **ESLint**: Code quality and linting
- **Husky**: Git hooks for pre-commit checks
- **VS Code**: Editor integration

## Setup

### Automatic Formatting (Recommended)

1. **Install VS Code extensions** (recommended via `.vscode/extensions.json`):
   - Prettier - Code formatter
   - ESLint

2. **VS Code will automatically**:
   - Format files on save
   - Fix ESLint issues on save
   - Use project's Prettier config

### Manual Commands

```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Lint frontend
npm run lint:frontend

# Lint backend
npm run lint:backend

# Lint both
npm run lint:all

# Fix all formatting and linting issues
npm run fix:all
```

## Git Hooks

### Pre-commit Hook

Automatically runs before each commit:

1. **Formats code** with Prettier
2. **Stages formatted files**
3. **Runs linting checks**
4. **Validates builds**
5. **Checks documentation**

### Commit Message Hook

Enforces conventional commit format using commitlint.

## Configuration Files

### Prettier Config (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "bracketSameLine": false
}
```

### ESLint Integration

Both frontend and backend ESLint configs include `eslint-config-prettier` to disable formatting rules that conflict with Prettier.

## Style Guidelines

### JavaScript/JSX

- **Single quotes** for strings
- **No semicolons**
- **2 spaces** indentation
- **100 character** line length
- **Trailing commas** in ES5 contexts
- **Arrow functions** without parentheses for single params

### Example

```javascript
// ✅ Good
const handleSubmit = async data => {
  try {
    const response = await api.post('/users', {
      name: data.name,
      email: data.email,
    })
    return response.data
  } catch (error) {
    console.error('Submit failed:', error)
  }
}

// ❌ Bad
const handleSubmit = async data => {
  try {
    const response = await api.post('/users', {
      name: data.name,
      email: data.email,
    })
    return response.data
  } catch (error) {
    console.error('Submit failed:', error)
  }
}
```

## Troubleshooting

### VS Code Not Formatting

1. Check if Prettier extension is installed
2. Verify `.prettierrc` exists in root
3. Check VS Code settings include:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true
   }
   ```

### ESLint Errors

1. Run `npm run fix:all` to auto-fix issues
2. Check ESLint output for specific errors
3. Ensure `eslint-config-prettier` is installed

### Pre-commit Hook Failing

1. Run `npm run format` manually
2. Fix any linting errors
3. Ensure all tests pass
4. Check git hooks are executable

## Benefits

- **Consistency**: Same style across entire codebase
- **Productivity**: No time wasted on style discussions
- **Quality**: Automatic formatting prevents style-related bugs
- **Integration**: Seamless editor experience
- **Team Collaboration**: Everyone uses same formatting rules
