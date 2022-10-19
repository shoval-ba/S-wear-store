module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    // 'standard-with-typescript'
    // "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project : './tsconfig.json'
  },
  plugins: [
    'react'
  ],
  rules: {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      { "avoidEscape": true }
    ],
    "semi": ["error", "always"],
    "max-len": [
      "error",
      { "code": 130 }
    ],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "array-bracket-spacing": ["error", "never"],
    "arrow-spacing": "error",
    "brace-style": "error",
    "comma-spacing": [
      "error",
      { "before": false, "after": true }
    ],
    "computed-property-spacing": ["error", "never"],
    "dot-location": ["error", "property"],
    "func-call-spacing": ["error", "never"],
    "implicit-arrow-linebreak": ["error", "beside"],
    "key-spacing": [
      "error",
      { "beforeColon": false }
    ],
    "keyword-spacing": [
      "error",
      { "before": true }
    ],
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "spaced-comment": ["error", "always"]
  }
}
