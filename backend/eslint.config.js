import js from '@eslint/js'
import nodePlugin from 'eslint-plugin-n'
import securityPlugin from 'eslint-plugin-security'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  securityPlugin.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        global: 'readonly'
      }
    },
    plugins: {
      n: nodePlugin,
      security: securityPlugin,
      import: importPlugin
    },
    rules: {
      // Node.js specific rules
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/prefer-global/process': 'error',
      'n/prefer-global/console': 'error',
      'n/prefer-global/buffer': 'error',
      'n/no-process-exit': 'off', // error

      // Code quality rules
      'no-console': 'off', // warn
      'no-unused-vars': ['off', { // error
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],

      // Import/Export rules
      'import/no-unresolved': 'off', // Turn off as it conflicts with ES modules
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Express.js specific rules
      'no-sync': 'off', // warn
      'callback-return': 'off', //warn
      'handle-callback-err': 'off', //warn

      // Security rules (already included from security plugin config)
      'security/detect-object-injection': 'off', // warn
      'security/detect-non-literal-fs-filename': 'off', // warn
      'security/detect-non-literal-regexp': 'off' // warn
    }
  }
]
