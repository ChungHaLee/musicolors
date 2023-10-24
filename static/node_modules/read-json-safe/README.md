# read-json-safe
![dependencies](https://img.shields.io/david/bconnorwhite/read-json-safe)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/read-json-safe)
![npm](https://img.shields.io/npm/v/read-json-safe)

Read and parse JSON files without try catch.

Returns `undefined` if the file does not exist.

```
yarn add read-json-safe
```

## API
```ts
import { readFile, readJSONSync, JSONObject } from "read-json-safe";

readJSONSync(path: string) => JSONObject | undefined;

readJSON(path: string) => Promise<JSONObject | undefined>;
```

