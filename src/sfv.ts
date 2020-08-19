import { createHash } from 'crypto';
import { createReadStream, promises as fs } from 'fs';
import { relative } from 'path';
import cyclic32 from 'cyclic-32';
import globby from 'globby';

async function fromStream(stream: NodeJS.ReadableStream, algorithm = 'crc32'): Promise<string> {
  const algorithmSlug = slugify(algorithm);
  const hashingFunction = algorithmSlug === 'crc32'
    ? cyclic32.createHash()
    : createHash(algorithm);

  return new Promise((resolve, reject) => {
    stream
      .pipe(hashingFunction)
      .on('error', error => reject(error))
      .on('data', buffer => resolve(buffer.toString('hex').toUpperCase()));
  });
}

async function fromFile(inputFile: string, algorithm = 'crc32'): Promise<string> {
  await fs.access(inputFile);

  return await fromStream(createReadStream(inputFile), algorithm);
}

async function fromFiles(globString: string | string[], algorithm = 'crc32'): Promise<unknown[]> {
  const inputFiles = await globby(globString)

  return Promise.all(
    inputFiles.map(async inputFile => (
      {
        file: relative(process.cwd(), inputFile),
        checksum: await fromFile(inputFile, algorithm)
      }
    ))
  );
}

function slugify(algorithm: string): string {
  return (
    algorithm
      .trim()
      .toLowerCase()
      .replace('-', '')
  );
}

export {
  fromFile,
  fromFiles,
  fromStream,
};
