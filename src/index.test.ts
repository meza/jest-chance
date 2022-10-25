describe('Jest-Chance', () => {
  let Chance: jest.Mocked<any>;
  const hashMock = jest.fn();

  beforeEach(async () => {
    jest.resetModules();
    Chance = jest.requireMock('chance');
    jest.mock('chance', jest.fn().mockImplementation(() => {
      return jest.fn().mockImplementation(() => {
        return {
          hash: hashMock
        };
      });
    })
    );
  });

  describe('When a chance instance is requested with a specific seed', () => {
    const randomSeed = Date.now().toString();

    beforeEach(() => {
      process.env.CHANCE_SEED = randomSeed;
    });

    it('It passes it through', async () => {
      // tslint:disable-next-line
      (await import('./index')).chance;

      expect(jest.mocked(Chance)).toHaveBeenCalledTimes(1);
      expect(jest.mocked(Chance)).toHaveBeenCalledWith(randomSeed);
    });
  });

  describe('When a chance instance is requested without a seed', () => {
    const randomSeed = Date.now().toString();
    beforeEach(() => {
      delete process.env.CHANCE_SEED;
      hashMock.mockReset();
      hashMock.mockReturnValueOnce(randomSeed);
    });

    it('It generates a new one', async () => {
      // tslint:disable-next-line
      (await import('./index')).chance;

      expect(Chance).toHaveBeenCalledTimes(2);
      expect(Chance).toHaveBeenNthCalledWith(1);
      expect(Chance).toHaveBeenNthCalledWith(2, randomSeed);
    });
  });

  describe('getChance without seed', () => {
    const randomSeed = Date.now().toString();
    beforeEach(() => {
      delete process.env.CHANCE_SEED;
      hashMock.mockReset();
      hashMock.mockReturnValueOnce(randomSeed);
    });

    it('It generates a new seed', async () => {
      (await import('./index')).getChance();
      expect(Chance).toHaveBeenCalledTimes(3);
      expect(Chance).toHaveBeenNthCalledWith(1);
      expect(Chance).toHaveBeenNthCalledWith(3, randomSeed);
    });
  });

  describe('getChance with a seed', () => {
    const randomSeed = Date.now().toString();
    beforeEach(() => {
      delete process.env.CHANCE_SEED;
      hashMock.mockReset();
      hashMock.mockReturnValueOnce(randomSeed);
    });

    it('It returns the specified seed', async () => {
      (await import('./index')).getChance(randomSeed);
      expect(Chance).toHaveBeenCalledTimes(3);
      expect(hashMock).toHaveBeenCalledTimes(1);
      expect(Chance).toHaveBeenNthCalledWith(3, randomSeed);
    });
  });

  describe('When a test runner is requested with a specific seed', () => {
    const randomSeed = Date.now().toString();

    beforeEach(() => {
      process.env.CHANCE_SEED = randomSeed;
    });

    it('It passes it through', async () => {
      // tslint:disable-next-line
      const testRunnerSeed = (await import('./index')).default();
      expect(testRunnerSeed).toBe(randomSeed);
    });
  });

  describe('When a test runner is requested without a seed', () => {
    const randomSeed = Date.now().toString();
    beforeEach(() => {
      delete process.env.CHANCE_SEED;
      hashMock.mockReset();
      hashMock.mockReturnValueOnce(randomSeed);
    });

    it('It generates a new one', async () => {
      const testRunnerSeed = (await import('./index')).default();
      expect(testRunnerSeed).toBe(randomSeed);
    });
  });

});
