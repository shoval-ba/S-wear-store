module.exports = {
  env: {
    browser: true,
    es2021: true,

    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".ts", ".d.ts", ".tsx"],
      },
    },
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-plusplus": ["off"],
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "import/prefer-default-export": ["off"],
    "import/extensions": ["error", "never"],
    "import/no-unresolved": [2],
    "spaced-comment": ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-unused-vars": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    " no-console": "off",
  },
};
