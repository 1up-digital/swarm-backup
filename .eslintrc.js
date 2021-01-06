module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'max-len': ["error", { "code": 200 }]
  },
  plugins: ["mocha"]
};
// max-len