const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../tests/frontend/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/node_modules'],
  transformIgnorePatterns: ['/node_modules/(?!(@babel/runtime|@mui|@emotion|react|react-dom)/)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
    path.join(__dirname, '../tests/frontend/**/*.test.js'),
  ],
  rootDir: __dirname,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '../coverage/frontend',
};
