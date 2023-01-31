// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactPackageJson = require('./packages/demo/node_modules/react/package.json');

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react-hooks',
    'typescript-sort-keys',
    'simple-import-sort',
    'unicorn',
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: reactPackageJson.version,
    },
  },
  overrides: [
    {
      files: ['*.js', '.*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
        strict: [ERROR, 'global'],
      },
    },
    {
      files: ['worker.ts'],
      env: {
        worker: true,
      },
      rules: {
        'no-restricted-globals': OFF,
      },
    },
  ],
  rules: {
    // disabled by default by prettier conf
    curly: [ERROR, 'all'],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // additional rules:
    'no-console': WARN,
    'no-empty': OFF,
    'no-restricted-syntax': [
      ERROR,
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-unexpected-multiline': ERROR,
    'no-unsafe-optional-chaining': WARN,
    // @typescript-eslint/no-unused-vars does the same
    'no-unused-vars': OFF,
    // @typescript-eslint/no-useless-constructor does the same (there was a problem with d.ts)
    'no-useless-constructor': OFF,
    // base on https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
    // @typescript-eslint/no-use-before-define does the same
    'no-use-before-define': OFF,
    // seem not to be useful when typescript is used
    'no-prototype-builtins': OFF,
    'no-var': ERROR,
    'prefer-const': ERROR,
    'prefer-destructuring': [
      ERROR,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    radix: [ERROR, 'always'],
    'import/no-anonymous-default-export': OFF,
    quotes: [
      ERROR,
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'unicorn/catch-error-name': [
      'error',
      {
        name: 'error',
      },
    ],
    'unicorn/prefer-number-properties': ERROR,
    'no-eq-null': ERROR,
    eqeqeq: [ERROR, 'always'],
    'no-implicit-coercion': ERROR,

    // suppress errors for missing 'import React' in files
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-sort-props': WARN,
    'react/jsx-no-target-blank': [WARN, { allowReferrer: true }],
    'react/no-unescaped-entities': [ERROR, { forbid: ['>', '"', '}'] }],
    'react-hooks/exhaustive-deps': WARN,
    'react-hooks/rules-of-hooks': ERROR,
    semi: [ERROR, 'always'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // TS rules to disable / customize
    '@typescript-eslint/camelcase': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    '@typescript-eslint/no-inferrable-types': OFF,
    '@typescript-eslint/no-use-before-define': [
      ERROR,
      { classes: false, functions: false },
    ],
    '@typescript-eslint/prefer-interface': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/ban-types': [
      ERROR,
      {
        types: {
          object: false,
        },
        extendDefaults: true,
      },
    ],
    'typescript-sort-keys/interface': WARN,
    'typescript-sort-keys/string-enum': WARN,
    '@typescript-eslint/consistent-type-imports': [
      ERROR,
      { disallowTypeAnnotations: false },
    ],
  },
};
