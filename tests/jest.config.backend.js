const path = require('path');

module.exports = {
  displayName: 'backend',
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname, '..'),
  testMatch: [path.resolve(__dirname, './backend/**/*.test.js')],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/backend/$1'
  }
};
