module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  extends: [
    'airbnb-base',
    "airbnb-typescript/base",
    "prettier",
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": 2,
  },
};
