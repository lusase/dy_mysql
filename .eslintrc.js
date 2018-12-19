// {
//   "extends": "eslint-config-egg"
// }
module.exports = {
  root: true,
  env: {
    browser: false,
  },
  extends: [
    'eslint-config-egg'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 缩进
    'indent': 0,
    // 声明函数时 函数名后面要求一个空格
    'space-before-function-paren': 0,
    // 行后的空格
    'no-trailing-spaces': 0,
    // reject 参数要求为Error对象
    'prefer-promise-reject-errors': 0,
    //
    'linebreak-style': 0,
    'object-curly-spacing': 0,
    'semi': 0,
    'array-bracket-spacing': 0,
    'comma-dangle': 0
  }
}