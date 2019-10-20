module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": "off",
    "arrow-parens": "off",
    "no-param-reassign": "off",
    "comma-dangle": "off",
    "import/prefer-default-export": "off"
  }
};
