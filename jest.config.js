/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',               // Use ts-jest preset for TypeScript
  testEnvironment: 'node',         // Set the test environment to Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest',      // Use ts-jest to transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],  // Look for test files under the tests folder
  verbose: true,                   // Show detailed test results
  collectCoverage: true,           // Collect code coverage
  coverageDirectory: 'coverage',   // Output directory for coverage reports
};