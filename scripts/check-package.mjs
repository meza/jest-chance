import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const importedPackage = await import('jest-chance');
const requiredPackage = createRequire(import.meta.url)('jest-chance');

for (const packageEntry of [importedPackage, requiredPackage]) {
  assert.equal(typeof packageEntry.default, 'function');
  assert.equal(typeof packageEntry.getChance, 'function');
  assert.equal(typeof packageEntry.chance, 'object');
}
