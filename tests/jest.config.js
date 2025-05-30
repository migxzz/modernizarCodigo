module.exports = {
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/backend/**/*.test.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/backend/$1'
      },
      rootDir: '../'
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/frontend/**/*.test.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/frontend/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      },
      setupFilesAfterEnv: ['<rootDir>/tests/frontend/setupTests.js'],
      rootDir: '../'
    }
  ]
};