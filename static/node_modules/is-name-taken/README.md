<div align="center">
  <h1>is-name-taken</h1>
  <a href="https://npmjs.com/package/is-name-taken">
    <img alt="npm" src="https://img.shields.io/npm/v/is-name-taken.svg">
  </a>
  <a href="https://github.com/bconnorwhite/is-name-taken">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/is-name-taken.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/is-name-taken?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/is-name-taken.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/is-name-taken">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/is-name-taken?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Check if an NPM package name is taken.

Validates an NPM package name and then checks if a conflicting package exists. Also accounts for [punctuation differences](https://blog.npmjs.org/post/168978377570/new-package-moniker-rules).


## Installation

```bash
yarn add is-name-taken
```

```bash
npm install is-name-taken
```
## API

```ts
import { isTaken, isValid } from "is-name-taken";

// Check if a package name is taken, and if so, return the conflict:

isTaken("ch-alk"); // "chalk"

// If not taken, return false

isTaken("package-that-doesnt-exist"); // false

// If invalid, return true

isTaken("INVALID_NAME"); // true

// Check if a package name is valid

isValid("chalk"); // true

isValid("INVALID_NAME"); // false

```
#### Types:
```ts
import { Options } from "is-name-taken";

type Options = {
  /**
   * Maximum milliseconds after a sync to avoid re-syncing
   */
  maxAge?: number;
  /**
   * Setting optimistic to true will skip syncing latest packages from NPM.
   * This is faster, but may lead to inconsistencies with recently published packages.
   */
  optimistic?: boolean;
};

function isValid(name: string): boolean;

function isTaken(name: string, options?: Options): Promise<string | boolean>;
```

##

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/is-name-taken.svg"></h2>

- [all-package-names](https://npmjs.com/package/all-package-names): Get all NPM package names
- [package-name-conflict](https://npmjs.com/package/package-name-conflict): Check if NPM package names conflict
- [validate-npm-package-name](https://npmjs.com/package/validate-npm-package-name): Give me a string and I'll tell you if it's a valid npm package name 

##

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/is-name-taken.svg"></h2>

- [@bconnorwhite/bob](https://npmjs.com/package/@bconnorwhite/bob): Bob builds and watches typescript projects.
- [@types/validate-npm-package-name](https://npmjs.com/package/@types/validate-npm-package-name): TypeScript definitions for validate-npm-package-name

##

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/is-name-taken.svg"></h2>

[MIT](https://mit-license.org/)

##

<br />

## Related Packages

- [package-name-conflict](https://npmjs.com/package/package-name-conflict): Check if NPM package names conflict
- [all-package-names](https://npmjs.com/package/all-package-names): Get all NPM package names.
- [npm-pd](https://npmjs.com/package/npms-pd): A CLI dashboard for NPM publishers
- [npms-io-client](https://npmjs.com/package/npms-io-client): Isomorphic typed client for npms.io
