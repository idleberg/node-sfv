# simple-file-verification

[![npm](https://flat.badgen.net/npm/license/simple-file-verification)](https://www.npmjs.org/package/simple-file-verification)
[![npm](https://flat.badgen.net/npm/v/simple-file-verification)](https://www.npmjs.org/package/simple-file-verification)
[![CI](https://img.shields.io/github/workflow/status/idleberg/node-sfv/CI?style=flat-square)](https://github.com/idleberg/node-sfv/actions)

Library to calculate SFV checksums from files and streams (see [Simple File Verification](https://www.wikiwand.com/en/Simple_file_verification) for details)

## Installation

`npm install simple-file-verification -S`

## Usage

```js
import * as SFV from 'simple-file-verification';
import { createReadStream } from 'fs';

(async() => {
  await SFV.fromFile('path/to/file');
  await SFV.fromFiles('path/to/*.pdf');
  await SFV.fromStream(createReadStream('path/to/file'));
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

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
