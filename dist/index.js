"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = __importDefault(require("chance"));
const getSeed = () => {
    if (!process.env.CHANCE_SEED) {
        const seedGenerator = new chance_1.default();
        process.env.CHANCE_SEED = seedGenerator.hash();
    }
    return process.env.CHANCE_SEED;
};
exports.getChance = (seed) => {
    if (seed) {
        return new chance_1.default(seed);
    }
    else {
        const randomSeed = getSeed();
        return new chance_1.default(randomSeed);
    }
};
exports.chance = exports.getChance();
const jestThing = () => {
    const seed = getSeed();
    // eslint-disable-next-line
    console.log('\n');
    // eslint-disable-next-line
    console.log(`Using Chance Seed: ${seed}`);
    return seed;
};
exports.default = jestThing;
