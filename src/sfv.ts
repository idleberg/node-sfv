import type { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { crc32, createCRC32 } from 'hash-wasm';

/**
 * Returns a checksum from a readable file stream.
 * @param stream
 * @returns the checksum for a provided file stream.
 */
export async function fromStream(stream: NodeJS.ReadableStream): Promise<string> {
	const hasher = await createCRC32();

	return new Promise((resolve, reject) => {
		const onError = (error: Error) => {
			cleanup();
			reject(error);
		};

		const onData = (chunk: Buffer | string) => {
			try {
				hasher.update(chunk);
			} catch (error) {
				cleanup();
				reject(error);
			}
		};

		const onEnd = () => {
			cleanup();
			const hash = hasher.digest();
			resolve(hash.toUpperCase());
		};

		const cleanup = () => {
			stream.off('error', onError);
			stream.off('data', onData);
			stream.off('end', onEnd);
		};

		stream.on('error', onError);
		stream.on('data', onData);
		stream.on('end', onEnd);
	});
}

/**
 * Returns a checksum for a file.
 * @param inputFile path to a file
 * @returns the checksum for a provided file.
 */
export async function fromFile(inputFile: string): Promise<string> {
	const fileContents = await readFile(inputFile);

	return (await crc32(fileContents)).toUpperCase();
}
