module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
    "no-debugger": "off",
    "vue/script-setup-uses-vars": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-this-alias": "error",
    "prefer-rest-params": "error",
    "prefer-const": "error",
    "no-const-assign": "error",
    "no-var": "error",
    "no-array-constructor": "error",
    "no-new-object": "error",
    "no-console": "warn",
    "no-cond-assign": ["error", "always"],
    curly: [2, "all"],
    "no-undef-init": "error"
  }
};
