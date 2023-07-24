import { createHash } from 'node:crypto';
import { createReadStream, promises as fs } from 'node:fs';
import { glob } from 'glob';
import { relative } from 'node:path';
import cyclic32 from 'cyclic-32';

export async function fromStream(stream: NodeJS.ReadableStream, algorithm = 'crc32'): Promise<string> {
	const algorithmSlug = slugify(algorithm);
	const hashingFunction = algorithmSlug === 'crc32'
		? cyclic32.createHash()
		: createHash(algorithm);

	return new Promise((resolve, reject) => {
		stream
			.pipe(hashingFunction)
			.on('error', error => reject(error))
			.on('data', buffer => resolve(`${getPrefix(algorithm)}${buffer.toString('hex').toUpperCase()}`));
	});
}

export async function fromFile(inputFile: string, algorithm = 'crc32'): Promise<string> {
	await fs.access(inputFile);

	return await fromStream(createReadStream(inputFile), algorithm);
}

export async function fromFiles(globString: string | string[], algorithm = 'crc32'): Promise<unknown[]> {
	const inputFiles = await glob(globString)

	return await Promise.all(
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

function getPrefix(algorithm: string): string {
	return algorithm.toLowerCase() !== 'crc32'
		? `${algorithm.toUpperCase()}:`
		: '';
}
