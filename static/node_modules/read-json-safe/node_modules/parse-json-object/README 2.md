<div align="center">
  <h1>parse-json-object</h1>
  <a href="https://npmjs.com/package/parse-json-object">
    <img alt="npm" src="https://img.shields.io/npm/v/parse-json-object.svg">
  </a>
  <a href="https://github.com/bconnorwhite/parse-json-object">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/parse-json-object.svg">
  </a>
  <a href="https://github.com/bconnorwhite/parse-json-object">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/parse-json-object?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Parse a typed JSON object.

- Returns `undefined` if unable to parse
- Returns typed JSON object if successful

## Installation

```bash
yarn add parse-json-object
```

```bash
npm install parse-json-object
```

## API

### Types
```ts
import parse, {
  isJSONObject,
  JSONObject,
  JSONValue,
  JSONArray
} from "parse-json-object";

function parse<T extends JSONObject>(json?: string) => T | undefined;

function isJSONObject(object?: JSONValue): object is JSONObject;

type JSONObject = {
  [key in string]?: JSONValue
};

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONArray extends Array<JSONValue> {};
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/parse-json-object.svg"></h2>

- [types-json](https://www.npmjs.com/package/types-json): Type checking for JSON objects

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/parse-json-object.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/parse-json-object.svg"></h2>

[MIT](https://mit-license.org/)

<br />

## Related Packages:
- [stringify-json-object](https://www.npmjs.com/package/stringify-json-object): Stringify and format a JSON object.
- [types-json](https://www.npmjs.com/package/types-json): Type checking for JSON objects
