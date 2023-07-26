# simple-file-verification

> Library to calculate [SFV](https://www.wikiwand.com/en/Simple_file_verification) checksums from files and streams

[![License](https://img.shields.io/github/license/idleberg/node-sfv?color=blue&style=for-the-badge)](https://github.com/idleberg/node-sfv/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/simple-file-verification?style=for-the-badge)](https://www.npmjs.org/package/simple-file-verification)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-sfv/default.yml?style=for-the-badge)](https://github.com/idleberg/node-sfv/actions)

## Installation

`npm install simple-file-verification -S`

## Usage

```js
import * as SFV from "simple-file-verification";
import { createReadStream } from "fs";

(async () => {
	await SFV.fromFile("path/to/file");
	await SFV.fromFiles("path/to/*.pdf");
	await SFV.fromStream(createReadStream("path/to/file"));
})();
```

### API

All API methods default to SFV's standard CRC32 algorithm. You can also specify the extended SFV (`.sfvx`) algorithms MD5, SHA-1, SHA-256, or SHA-512.

#### `fromFile`

Usage: `fromFile(filePath, algorithm?)`

Returns checksum for specified file

#### `fromFiles`

Usage: `fromFiles(filePath, algorithm?)`

Returns array of files/checksums objects for specified glob

#### `fromStream`

Usage: `fromStream(readableStream, algorithm?)`

Returns checksum Node.js readable stream

## Related

- [sfv-cli](https://www.npmjs.com/package/sfv-cli)

## License

This work is licensed under [The MIT License](LICENSE)
