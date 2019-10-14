import Chance from 'chance';
import { Chance as ChanceType, Seed } from './index.d';

const getSeed = (): Seed => {
  if (!process.env.CHANCE_SEED) {
    const seedGenerator = new Chance();
    process.env.CHANCE_SEED = seedGenerator.hash();
  }
  return process.env.CHANCE_SEED;
};

export const getChance = (seed?: Seed): ChanceType => {
  if (seed) {
    return new Chance(seed);
  } else {
    const randomSeed = getSeed();
    return new Chance(randomSeed);
  }
};

export const chance: ChanceType = getChance();

const jestThing = () => {
  const seed = getSeed();

  // tslint:disable-next-line
  console.log('\n');
  // tslint:disable-next-line
  console.log(`Using Chance Seed: ${seed}`);
  return seed;
};

export default jestThing;
