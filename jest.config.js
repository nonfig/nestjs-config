// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    "schematics/**",
    "src/**",
  ]
};
