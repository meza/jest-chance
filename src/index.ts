import Chance from 'chance';

const getSeed = () => {
  if (!process.env.CHANCE_SEED) {
    const seedGenerator = new Chance();
    process.env.CHANCE_SEED = seedGenerator.hash();
  }
  return process.env.CHANCE_SEED;
};

export const getChance = (seed?: Chance.Seed) => {
  if (seed) {
    return new Chance(seed);
  } else {
    const randomSeed = getSeed();
    return new Chance(randomSeed);
  }
};

export const chance = getChance();

export default () => {
  const seed = getSeed();

  // eslint-disable-next-line
  console.log('\n');

  // eslint-disable-next-line
  console.log(`Using Chance Seed: ${seed}`);
  return seed;
};
