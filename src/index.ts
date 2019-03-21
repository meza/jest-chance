import Chance from 'chance';

const getSeed = () => {
  const seedGenerator = new Chance();
  if (!process.env.CHANCE_SEED) {
    process.env.CHANCE_SEED = seedGenerator.hash();
  }
  return process.env.CHANCE_SEED;
};

const getChance = () => {
  return new Chance(getSeed());
};

export const chance = getChance();

const jestThing = () => {
  getSeed();

  // tslint:disable-next-line
  console.log(`Using Chance Seed: ${process.env.CHANCE_SEED}`);
};

export default jestThing;
