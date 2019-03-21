"use strict";
exports.__esModule = true;
var chance_1 = require("chance");
var getSeed = function () {
    var seedGenerator = new chance_1["default"]();
    if (!process.env.CHANCE_SEED) {
        process.env.CHANCE_SEED = seedGenerator.hash();
    }
    return process.env.CHANCE_SEED;
};
var getChance = function () {
    return new chance_1["default"](getSeed());
};
exports.chance = getChance();
var jestThing = function () {
    getSeed();
    // tslint:disable-next-line
    console.log("Using Chance Seed: " + process.env.CHANCE_SEED);
};
exports["default"] = jestThing;
