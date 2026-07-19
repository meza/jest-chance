import { copyFile, rename } from 'node:fs/promises';

await Promise.all([
  rename('dist/cjs/index.js', 'dist/cjs/index.cjs'),
  copyFile('dist/types/index.d.ts', 'dist/types/index.d.cts'),
]);
