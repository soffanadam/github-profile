module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>/src', '<rootDir>/tests/unit'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
