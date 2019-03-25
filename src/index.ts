import Chance from 'chance';

const getSeed = () => {
  if (!process.env.CHANCE_SEED) {
    const seedGenerator = new Chance();
    process.env.CHANCE_SEED = seedGenerator.hash();
  }
  return process.env.CHANCE_SEED;
};

const getChance = () => {
  const seed = getSeed();
  return new Chance(seed);
};

export const chance = getChance();

const jestThing = () => {
  const seed = getSeed();

  // tslint:disable-next-line
  console.log(`\nUsing Chance Seed: ${seed}`);
  return seed;
};

export default jestThing;
