import Chance from 'chance';

import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('chance');

describe('Test Chance', () => {
  let chanceMock: Chance.Chance;
  beforeEach(() => {
    chanceMock = new Chance();
    vi.resetAllMocks();
    vi.resetModules();
  });

  describe('When a chance instance is requested with a specific seed', () => {
    it('It passes it through', async () => {
      const randomSeed = Date.now().toString();
      process.env.CHANCE_SEED = randomSeed;

      await import('./index.js');

      expect(vi.mocked(Chance)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(Chance)).toHaveBeenCalledWith(randomSeed);
    });
  });

  describe('When a chance instance is requested without a seed', () => {
    it('It generates a new one', async () => {
      const randomSeed = Date.now().toString();
      delete process.env.CHANCE_SEED;
      vi.mocked(chanceMock.hash).mockReturnValue(randomSeed);

      await import('./index.js');

      expect(Chance).toHaveBeenCalledTimes(2);
      expect(Chance).toHaveBeenNthCalledWith(1);
      expect(Chance).toHaveBeenNthCalledWith(2, randomSeed);
    });
  });

  describe('getChance without seed', () => {
    it('It generates a new seed', async () => {
      const randomSeed = Date.now().toString();
      delete process.env.CHANCE_SEED;
      vi.mocked(chanceMock.hash).mockReturnValue(randomSeed);

      const { getChance } = await import('./index.js');
      getChance();

      expect(Chance).toHaveBeenCalledTimes(3);
      expect(Chance).toHaveBeenNthCalledWith(1);
      expect(Chance).toHaveBeenNthCalledWith(3, randomSeed);
    });
  });

  describe('getChance with a seed', () => {
    it('It returns the specified seed', async () => {
      const randomSeed = Date.now().toString();
      delete process.env.CHANCE_SEED;
      vi.mocked(chanceMock.hash).mockReturnValue(randomSeed);

      const { getChance } = await import('./index.js');
      getChance(randomSeed);

      expect(Chance).toHaveBeenCalledTimes(3);
      expect(vi.mocked(chanceMock.hash)).toHaveBeenCalledTimes(1);
      expect(Chance).toHaveBeenNthCalledWith(3, randomSeed);
    });
  });

  describe('When a test runner is requested with a specific seed', () => {
    it('It passes it through', async () => {
      const randomSeed = Date.now().toString();
      process.env.CHANCE_SEED = randomSeed;

      const module = await import('./index.js');
      const testRunnerSeed = module.default();

      expect(testRunnerSeed).toBe(randomSeed);
    });
  });

  describe('When a test runner is requested without a seed', () => {
    it('It generates a new one', async () => {
      const randomSeed = Date.now().toString();

      delete process.env.CHANCE_SEED;
      vi.mocked(chanceMock.hash).mockReturnValue(randomSeed);

      const module = await import('./index.js');
      const testRunnerSeed = module.default();

      expect(testRunnerSeed).toBe(randomSeed);
    });
  });

});
