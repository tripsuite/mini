module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  globalSetup: "<rootDir>/jest.global-setup.ts",
  testPathIgnorePatterns: ['/node_modules/'],
};