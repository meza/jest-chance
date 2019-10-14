// Type definitions for . x.x
// Project: https://github.com/baz/foo (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="Chance" />

export declare type Chance = Chance.Chance;
export declare type Seed = number | string;
export const chance: Chance.Chance;
export const getChance: (seed?: number | string) =>  Chance.Chance;
