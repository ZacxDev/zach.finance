module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 'off'
  },
  ignorePatterns: ['**/node_modules/**']
}
