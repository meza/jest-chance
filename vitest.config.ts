import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: {
      dir: '.cache/.vitest'
    },
    dir: 'src',
    testTimeout: 10000,
    watch: false,
    outputFile: 'reports/junit.xml',
    reporters: ['verbose', 'junit'],
    coverage: {
      excludeNodeModules: true,
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/__mocks__/**.*', '**/*.d.ts'],
      all: true,
      reportsDirectory: './reports/coverage',
      reporter: ['text', 'cobertura'],
      statements: 100,
      branches: 100,
      functions: 80,
      lines: 100
    }
  }
});
