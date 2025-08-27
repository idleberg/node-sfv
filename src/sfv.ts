import type { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { createReadStream, promises as fs } from 'node:fs';
import { relative } from 'node:path';
import { cwd } from 'node:process';
import cyclic32 from 'cyclic-32';
import { glob } from 'glob';
import type SimpleFileValidation from '../types/index.d.ts';

/**
 * Returns a checksum from a readable file stream.
 * @param stream
 * @param algorithm
 * @returns the checksum for a provided file stream.
 */
export function fromStream(
	stream: NodeJS.ReadableStream,
	algorithm: SimpleFileValidation.Algorithm = 'crc32',
): Promise<string> {
	const algorithmSlug = slugify(algorithm);
	const hashingFunction = algorithmSlug === 'crc32' ? cyclic32.createHash() : createHash(algorithm);

	return new Promise((resolve, reject) => {
		stream
			.pipe(hashingFunction)
			.on('error', (error: Error) => reject(error))
			.on('data', (buffer: Buffer) => resolve(`${setPrefix(algorithm)}${buffer.toString('hex').toUpperCase()}`));
	});
}

/**
 * Returns a checksum for a file.
 * @param stream
 * @param algorithm
 * @returns the checksum for a provided file.
 */
export async function fromFile(
	inputFile: string,
	algorithm: SimpleFileValidation.Algorithm = 'crc32',
): Promise<string> {
	await fs.access(inputFile);

	return await fromStream(createReadStream(inputFile), algorithm);
}

/**
 * Returns an array of checksums for many files.
 * @param stream
 * @param algorithm
 * @returns an array of object consisting of filename and its checksum.
 */
export async function fromFiles(
	globString: string | string[],
	algorithm: SimpleFileValidation.Algorithm = 'crc32',
): Promise<SimpleFileValidation.FileMap[]> {
	const inputFiles = await glob(globString);

	return await Promise.all(
		inputFiles.map(async (inputFile) => ({
			file: relative(cwd(), inputFile),
			checksum: await fromFile(inputFile, algorithm),
		})),
	);
}

/**
 * Helper function to create a normalized "slug" version of a supported checksum algorithm.
 * @param algorithm
 * @returns a slug of the algorithm.
 */
function slugify(algorithm: SimpleFileValidation.Algorithm): string {
	return algorithm.trim().toLowerCase().replace('-', '');
}

/**
 * For SFVX, checksums get prefixed with the algorithm.
 * @param algorithm
 * @returns a prefix for the checksum.
 */
function setPrefix(algorithm: SimpleFileValidation.Algorithm): string {
	return algorithm.toLowerCase() !== 'crc32' ? `${algorithm.toUpperCase()}:` : '';
}
