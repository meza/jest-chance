# <p align="center">Jest-Chance ![npm](https://img.shields.io/npm/v/jest-chance.svg)</p>

<p align="center">A small library to help javascript projects deal with reproducible randomised test data.<br/><b>Works with vitest too!</b></p>
<div align="center">

[![install size](https://packagephobia.now.sh/badge?p=jest-chance)](https://packagephobia.now.sh/result?p=jest-chance)
[![npm downloads](https://img.shields.io/npm/dm/jest-chance.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jest-chance)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/jest-chance.svg)
![NPM](https://img.shields.io/npm/l/jest-chance.svg)

![npm dependency version](https://img.shields.io/npm/dependency-version/jest-chance/chance.svg)

</div>

## Why?

When working with larger teams with varied skill levels, it can be difficult to ensure that tests are written in a way that is consistent and reproducible. 
This can lead to tests that are flaky and hard to debug.

It's very easy to make tests pass if the test is only testing for one single known input, expecting a known output.

If this is your test:

```javascript
test('should return world when saying hello', () => {
  expect(add(1, 1)).toBe(2);
});
```

Then it's very easy to make this test pass by changing the implementation to:

```javascript
export const add = (a, b) => 2;
```

In traditional unit testing, we would apply a technique called triangulation to ensure that our tests are not brittle.
It means adding at least 3 examples of known inputs and outputs.

While this is a good start, it introduces a new problem: a large amount of code needs to be written for even the simplest tests.

In comes randomised data and [Monkey Testing](https://en.wikipedia.org/wiki/Monkey_testing) to the rescue!

When done correctly, randomised data can help you with two things:

1. Over time, you will run the code through thousands of different inputs and outputs, and you will find edge cases that you may not have thought of.
2. It can help you communicate instances where the input is irrelevant for a given test.

### When **NOT** to use randomised data

In the example above, we are testing a simple function that adds two numbers together.
Writing random tests for this function is not very useful, as you would need to re-implement adding of 2 numbers in your test just to get the expected output.

A good rule of thumb is that when you find yourself reimplementing logic to get to an expected output, you shouldn't be using random data.

### When to use randomised data

- Asserting that a value you passed in, gets passed on to a mock
- When the contents of the data is irrelevant to the test
- When you can assert on the shape of the data, but not the contents
- When you want to test that your code can handle a large variety of inputs

### Repeatable Tests

When using randomised data, it's important to ensure that the tests are repeatable.

The most common pitfall of randomised testing is that you can end up with a lot of tests that are hard to debug.

Builds break on CI systems and when you want to replay them locally, you can't because the random seed is not saved.

Unless you’re building regulated gambling solutions or highly specialised solutions, most of the randomizers 
you’ll end up working with will be pseudo-random generators. 

The main characteristic of such a thing is that the values they produce are completely determined by an initial value, 
called a seed. This means that if you ask for 5 random numbers in a sequence, the sequence will give you the exact same 
numbers every time if you use the same seed.

Fortunately for us, we’re completely ok with not being securely random, and we can use it to our advantage. 


## What does Jest-Chance do?

As we’ve learned, given the same seed value, we’ll always get the same random values generated.

This means that if we can find a way to expose and control our test seed, we could use that to reproduce our failing 
tests anywhere and any time we’d like.

And that's exactly what Jest-Chance does.

It's a wrapper around the [Chance](https://chancejs.com/) library, which is a great library for generating randomised data.

It takes the seed managament under control and helps you to write randomized tests that are repeatable and reproducible.


## Usage

### Installing

```
pnpm add -D jest-chance
```

```
yarn add -D jest-chance
```

```
npm install -D jest-chance
```

### Add to Jest

To have a random seed for each test execution, we need to tell Jest to use this library.

In your jest config, add the following:

```json
  ...
  "globalSetup": "jest-chance"
  ...
```

### Add to Vitest

Create a file called `vitest.setup.ts` in the root of your project and add the following:

```ts
import chanceSetup from 'jest-chance';

export const setup = () => {
  chanceSetup();
};
```

Then in your `vitest.config.ts` add the following:

```json
  ...
  "globalSetup": './vitest.setup.ts',
  ...
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
  
### Using with a fixed seed

Sometimes you would need deterministic generators. 
For that reason, you can use the method: `getChance(seed?)`

```js
import { getChance } from 'jest-chance';

const deterministicChance = getChance('a-fixed-seed');
 
```
  
## Repeating failed tests

When you run your tests, jest will tell you something like this in your execution logs:
```
Using Chance Seed: 534a873a618e4e317060f9bc29f9115ad156168b
```

This is the piece of information you need to replay the tests with the same values.

### Rerunning the tests

Set the `CHANCE_SEED` environment variable to the seed you got in the console previously
```
$ CHANCE_SEED=534a873a618e4e317060f9bc29f9115ad156168b jest
```

Due to the way pseudo-random generators work, you will have to run the **exact** command that your failing system runs.

> Repeating a subset of tests with the same seed will not result in the same values being generated.
>
> **You must run the exact same command that failed.**


---
![Twitter Follow](https://img.shields.io/twitter/follow/vsbmeza.svg?style=social)
