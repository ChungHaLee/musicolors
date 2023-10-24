<div align="center">
  <h1>parse-json-object</h1>
  <a href="https://npmjs.com/package/parse-json-object">
    <img alt="NPM" src="https://img.shields.io/npm/v/parse-json-object.svg">
  </a>
  <a href="https://github.com/bconnorwhite/parse-json-object">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/parse-json-object.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/parse-json-object?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/parse-json-object.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/parse-json-object">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/parse-json-object?label=Stars%20Appreciated%21&style=social">
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

```sh
yarn add parse-json-object
```

```sh
npm install parse-json-object
```

## API

### Types
```ts
import parse, {
  parseJSONValue,
  parseJSONObject,
  parseJSONArray,
  parseString,
  JSONValue,
  JSONObject,
  JSONValue,
  JSONArray
} from "parse-json-object";

function parse<T extends JSONValue>(value: string | undefined, isType: (value: T) => boolean): T | undefined;

function parseJSONValue<T extends JSONValue>(value?: string): T | undefined;

function parseJSONObject<T extends JSONObject>(value?: string): T | undefined;

function parseJSONArray<T extends JSONArray>(value?: string): T | undefined;

function parseString<T extends string>(value?: string): T | undefined;

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

type JSONObject = {
  [key in string]?: JSONValue
};

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

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages:

- [stringify-json-object](https://www.npmjs.com/package/stringify-json-object): Stringify and format a JSON object
- [types-json](https://www.npmjs.com/package/types-json): Type checking for JSON objects
