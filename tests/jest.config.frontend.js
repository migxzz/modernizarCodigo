const path = require('path');

module.exports = {
  displayName: 'frontend',
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, '..'),
  testMatch: [path.resolve(__dirname, './frontend/**/*.test.js')],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/frontend/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: [path.resolve(__dirname, './frontend/setupTests.js')]
};
