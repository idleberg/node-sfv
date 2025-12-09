# simple-file-verification

> Library to calculate [SFV](https://www.wikiwand.com/en/Simple_file_verification) checksums from files and streams.

[![License](https://img.shields.io/github/license/idleberg/node-sfv?color=blue&style=for-the-badge)](https://github.com/idleberg/node-sfv/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/simple-file-verification?style=for-the-badge)](https://www.npmjs.org/package/simple-file-verification)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/sfv?style=for-the-badge)](https://jsr.io/@idleberg/sfv)
[![Build: NodeJS](https://img.shields.io/github/actions/workflow/status/idleberg/node-sfv/ci-node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/node-sfv/actions)
[![Build: Deno](https://img.shields.io/github/actions/workflow/status/idleberg/node-sfv/ci-deno.yml?logo=deno&logoColor=white&style=for-the-badge)](https://github.com/idleberg/node-sfv/actions)

## Installation

`npm install simple-file-verification -S`

## Usage

```js
import * as SFV from 'simple-file-verification';
import { createReadStream } from 'node:fs';

await SFV.fromFile('path/to/file');

// Serving the purpose of an example
const fileStream = createReadStream('path/to/file')
await SFV.fromStream(fileStream);
```

### API

#### `fromFile`

Usage: `fromFile(filePath)`

Returns checksum for specified file.

#### `fromStream`

Usage: `fromStream(readableStream)`

Returns checksum for readable stream.

## Related

- [sfv-cli](https://www.npmjs.com/package/sfv-cli)

## License

This work is licensed under [The MIT License](LICENSE).
