<div align="center">
  <a href="https://github.com/bconnorwhite/read-file-safe">
    <img alt="read-file-safe" src="assets/header.svg" />
  </a>
  <a href="https://npmjs.com/package/read-file-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/read-file-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/read-file-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/read-file-safe.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/read-file-safe?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/read-file-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/read-file-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/read-file-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Read files without try catch.

- Returns string or Buffer if successful.
- Returns `undefined` on error rather than throwing.

## Installation

```sh
yarn add read-file-safe
```

```sh
npm install read-file-safe
```

## API

```ts
import { readFile, readFileSync } from "read-file-safe";

readFile(path: string) => Promise<string | undefined>;

readFileSync(path: string) => string | undefined;
```

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/read-file-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/read-file-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and parent directories if necessary
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
