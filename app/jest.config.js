module.exports = {
  // preset: '@vue/cli-plugin-unit-jest',
  // https://github.com/Swrve/create-react-app/commit/ddf46bd89431b9ea60d2b93b7112b15c7c324b23
  // roots: ['<rootDir>/src', '<rootDir>/__mocks__'],

  // https://github.com/facebook/jest/issues/1211
  // collectCoverageFrom: [
  //   'src/**/*.{js,jsx,ts,tsx,vue}',
  //   '!src/**/*.d.ts'
  //   // '!**/node_modules/**',
  //   // '!**/vendor/**'
  // ],

  // https://github.com/vuejs/vue-jest/issues/62
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/*.spec.js',
    '!src/main.js',
    '!src/router/**',
    '!**/node_modules/**',
    '!src/___check/**'
  ],
  // https://github.com/vuejs/vue-cli/issues/1584
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  modulePaths: [
    "<rootDir>"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
    '**/__tests__/*.{j,t}s?(x)',
    '**/tests/unit/**/*.spec.{j,t}s?(x)',
    '<rootDir>/__mocks__',

    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/(?!jquery/)'
  ],
  // setupTestFrameworkScriptFile: "<rootDir>/tests/setupJest"
  setupFiles: ["<rootDir>/tests/setupJest", "jest-canvas-mock"]
}
