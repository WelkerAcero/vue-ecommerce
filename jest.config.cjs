module.exports = {
    preset:'@vue/cli-plugin-unit-jest',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'babel-jest',
    },
}