module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["rxjs"],
  extends: ["standard-with-typescript", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.cjs", "vite.config.js", "dist", "**/*.validator.ts"],
  rules: {
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/array-type": 0,
    "@typescript-eslint/no-confusing-void-expression": ["error", "ignoreArrowShorthand"],
    "rxjs/no-ignored-subscription": "error",
  },
};
