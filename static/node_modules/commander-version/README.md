<div align="center">
  <h1>commander-version</h1>
  <a href="https://npmjs.com/package/commander-version">
    <img alt="npm" src="https://img.shields.io/npm/v/commander-version.svg">
  </a>
  <a href="https://github.com/bconnorwhite/commander-version">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/commander-version.svg">
  </a>
  <a href="https://github.com/bconnorwhite/commander-version">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/commander-version?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> A wrapper for Commander that automatically sets the version based on your package.json.

## Installation

```bash
yarn add commander-version
```

```bash
npm install commander-version
```

## API

### Default

To set the version, import `program` the same as you would for Commander, just pass `__dirname`:

```ts
import program from "commander-version";

program(__dirname)
  .name("my-program")
  .description("...")
  // ...
  .parse();
```

This creates a new Command rather than using the global Command, which can cause issues.

##

### Flags and Description

You can also add flags or descriptions the same as with `program.version()`:

> Note: the default flags are set to "-v --version" to be inline with other programs, such as Node.js.

```ts
import program from "commander-version";

// To set flags back to the Commander default of "-V --version", for example:

program(__dirname, "-V --version", "custom version description")
  .name("my-program")
  .description("...")
  // ...
  .parse();
```

##

### Types

For creating types, the Commander namespace can also be imported:

```ts
import { commander } from "commander-version";

type MyType = commander.Command;
```

##

### Commander

For convenience, Commander and createCommand can also be used without setting the version:

```ts
import { commander, createCommand } from "commander-version";

new commander.Command("my-command")
  .description("...")
  // ...

const myCommand = createCommand("my-command")
  .description("...")
  // ...
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/commander-version.svg"></h2>

- [@bconnorwhite/module](https://www.npmjs.com/package/@bconnorwhite/module): Read your module's package.json without importing it
- [commander](https://www.npmjs.com/package/commander): the complete solution for node.js command-line programs

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/commander-version.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/commander-version.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

## Related Packages

- [@bconnorwhite/module](https://www.npmjs.com/package/@bconnorwhite/module): Read your module's package.json without importing it
