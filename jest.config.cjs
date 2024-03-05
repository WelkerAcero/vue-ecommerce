// jest.config.js
module.exports = {
  // Otros ajustes de Jest...
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
};