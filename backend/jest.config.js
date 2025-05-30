const path = require('path');

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
    path.join(__dirname, '../tests/backend/**/*.test.js'),
  ],
  rootDir: __dirname,
};
