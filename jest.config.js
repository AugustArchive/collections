/**
 * Jest configuration for Immutable
 */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.spec.ts'],
  verbose: true,
  preset: 'ts-jest',
  name: 'Immutable',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
};
