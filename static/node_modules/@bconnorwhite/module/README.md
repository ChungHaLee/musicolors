<div align="center">
  <h1>@bconnorwhite/module</h1>
  <a href="https://npmjs.com/package/@bconnorwhite/module">
    <img alt="npm" src="https://img.shields.io/npm/v/@bconnorwhite/module.svg">
  </a>
  <a href="https://github.com/bconnorwhite/module">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/module.svg">
  </a>
  <a href="https://github.com/bconnorwhite/module">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/module?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Read your module's package.json without importing it.

Why not just import your package.json? Importing your package.json can [break your project's structure](https://stackoverflow.com/questions/55753163/package-json-is-not-under-rootdir/61467483#61467483) when using TypeScript if package.json is outside of your source folder.

## Installation

```bash
yarn add @bconnorwhite/module
```

```bash
npm install @bconnorwhite/module
```

## API

```ts
import {
  PackageJSON,
  getPackageJSON,
  getPackageJSONSync,
  getVersion,
  getVersionSync
} from "@bconnorwhite/module";

function getPackageJSON(dirname: string): Promise<PackageJSON | undefined>;

function getPackageJSONSync(dirname: string): PackageJSON | undefined;

function getVersion(dirname: string): Promise<string | undefined>;

function getVersionSync(dirname: string): string | undefined;
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/module.svg"></h2>

- [find-up](https://npmjs.com/package/find-up): Find a file or directory by walking up parent directories
- [read-json-safe](https://www.npmjs.com/package/read-json-safe): Read objects from JSON files without try catch.
- [types-pkg-json](https://www.npmjs.com/package/types-pkg-json): Type checking for package.json

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/module.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/@bconnorwhite/module.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [@bconnorwhite/package](https://www.npmjs.com/package/@bconnorwhite/package): A utility for reading package.json of a project, and forming paths relative to it.
