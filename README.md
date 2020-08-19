# simple-file-verification

[![npm](https://flat.badgen.net/npm/license/simple-file-verification)](https://www.npmjs.org/package/simple-file-verification)
[![npm](https://flat.badgen.net/npm/v/simple-file-verification)](https://www.npmjs.org/package/simple-file-verification)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-sfv)](https://circleci.com/gh/idleberg/node-sfv)
[![David](https://flat.badgen.net/david/dep/idleberg/node-sfv)](https://david-dm.org/idleberg/node-sfv)

Library to calculate SFV checksums from files and streams

## Installation

`npm install simple-file-verification -S`

## Usage

```js
import * as SFV from 'simple-file-verification';

(async() => {
  const fileChecksum = await SFV.fromFile('/path/to/file');
  const fileChecksums = await SFV.fromFile('/path/to/*.pdf');
})();
```

### API

All API methods default to SFV's standard CRC32 algorithm. You can also specify the extended SFV (`.sfvx`) algorithms MD5, SHA-1, SHA-256, or SHA-512.

#### `fromFile`

Usage: `fromFile(filePath, algorithm?)`

Returns checksum for specified file

#### `fromFiles`

Usage: `fromFiles(filePath, algorithm?)`

Returns checksum for specified glob

#### `fromStream`

Usage: `fromStream(readableStream, algorithm?)`

Returns checksum Node.js readable stream

## Related

- [sfv-cli](https://www.npmjs.com/package/sfv-cli)

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
