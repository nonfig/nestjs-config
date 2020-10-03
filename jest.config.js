// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  setupFiles: [
    'dotenv/config'
  ],
  collectCoverage: true,
  verbose: true,
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "/e2e/tests/.*\\.(e2e-test|e2e-spec).(ts|tsx|js)$",
  collectCoverageFrom : ["src/**/*.{js,jsx,tsx,ts}", "!**/node_modules/**", "!**/dist/**"],
  // coverageReporters: ["json", "lcov"]
};
