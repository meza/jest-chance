# Jest-Chance
A small library to help javascript projects deal with reproducible randomised test data.

[![CircleCI](https://circleci.com/gh/meza/jest-chance.svg?style=svg&circle-token=b69bc39aa5d08e174ecf97e2c0004078d639c3b0)](https://circleci.com/gh/meza/jest-chance)
[![codecov](https://codecov.io/gh/meza/jest-chance/branch/master/graph/badge.svg)](https://codecov.io/gh/meza/jest-chance)
![Dependencies](https://david-dm.org/meza/jest-chance.svg)
[![install size](https://packagephobia.now.sh/badge?p=jest-chance)](https://packagephobia.now.sh/result?p=jest-chance)
[![npm downloads](https://img.shields.io/npm/dm/jest-chance.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jest-chance)

## Usage

### Installing
```
yarn add -D jest-chance
```

```
npm install -D jest-chance
```

### Add to Jest
To have a random seed for each test execution, we need to tell Jest to use this library.

In your `package.json`, add the following:
```json
"jest": {
  "globalSetup": "jest-chance"
}
```

### Replace chance in your tests
Within your tests, you might have something like this:
>**Old Chance usage, don't copy this**
>```js 
>import Chance from 'chance';
>const chance = new Chance();
>```

This will be replaced by our new package's offering:

```js
import { chance } from 'jest-chance'; 
```

This will do 2 things:
  1. it will acquire a seed to use
  2. will return you a chance object primed with said seed
  
### Watch your logs
When you run your tests, jest will tell you something like this:
```
Using Chance Seed: 534a873a618e4e317060f9bc29f9115ad156168b
```

This is the piece of information you need to replay the tests with the same values.

### Replaying the tests
Set the `CHANCE_SEED` environment variable to the seed you got in the console previously
```
$ CHANCE_SEED=534a873a618e4e317060f9bc29f9115ad156168b jest
```

## Disclaimer:
There's more to follow, this is a WIP project. Feel free to contribute with pull requests.
