import { Buffer } from 'node:buffer';
import { createReadStream } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { Readable } from 'node:stream';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fromFile, fromStream } from './sfv.js';

const TEST_DIR = join(cwd(), 'test-fixtures');
const TEST_FILE = join(TEST_DIR, 'test-file.txt');
const EMPTY_FILE = join(TEST_DIR, 'empty-file.txt');

describe('simple-file-verification', () => {
	beforeAll(async () => {
		await mkdir(TEST_DIR, { recursive: true });
		await writeFile(TEST_FILE, 'Hello, World!', 'utf-8');
		await writeFile(EMPTY_FILE, '', 'utf-8');
	});

	afterAll(async () => {
		await rm(TEST_DIR, { recursive: true, force: true });
	});

	describe('fromFile', () => {
		it('should calculate CRC32 checksum from a file', async () => {
			const checksum = await fromFile(TEST_FILE);

			expect(checksum).toBe('EC4AC3D0');
		});

		it('should return checksum in uppercase', async () => {
			const checksum = await fromFile(TEST_FILE);

			expect(checksum).toMatch(/^[0-9A-F]+$/);
			expect(checksum).toBe(checksum.toUpperCase());
		});

		it('should handle empty files', async () => {
			const checksum = await fromFile(EMPTY_FILE);
			expect(checksum).toBe('00000000');
		});

		it('should throw error for non-existent file', async () => {
			await expect(fromFile(join(TEST_DIR, 'non-existent.txt'))).rejects.toThrow();
		});

		it('should produce consistent checksums for the same file', async () => {
			const checksum1 = await fromFile(TEST_FILE);
			const checksum2 = await fromFile(TEST_FILE);

			expect(checksum1).toBe(checksum2);
		});

		it('should handle binary data', async () => {
			const binaryFile = join(TEST_DIR, 'binary-file.bin');
			const binaryData = Buffer.from([0x00, 0x01, 0x02, 0x03, 0xff]);

			await writeFile(binaryFile, binaryData);

			const checksum = await fromFile(binaryFile);

			expect(checksum).toMatch(/^[0-9A-F]{8}$/);
		});
	});

	describe('fromStream', () => {
		it('should calculate CRC32 checksum from a stream', async () => {
			const stream = createReadStream(TEST_FILE);
			const checksum = await fromStream(stream);

			expect(checksum).toBe('EC4AC3D0');
		});

		it('should return checksum in uppercase', async () => {
			const stream = createReadStream(TEST_FILE);
			const checksum = await fromStream(stream);

			expect(checksum).toMatch(/^[0-9A-F]+$/);
			expect(checksum).toBe(checksum.toUpperCase());
		});

		it('should handle empty streams', async () => {
			const stream = createReadStream(EMPTY_FILE);
			const checksum = await fromStream(stream);
			expect(checksum).toBe('00000000');
		});

		it('should handle streams created from strings', async () => {
			const stream = Readable.from(['Hello, World!']);
			const checksum = await fromStream(stream);

			expect(checksum).toBe('EC4AC3D0');
		});

		it('should handle streams with multiple chunks', async () => {
			const chunks = ['Hello', ', ', 'World', '!'];
			const stream = Readable.from(chunks);
			const checksum = await fromStream(stream);

			expect(checksum).toBe('EC4AC3D0');
		});

		it('should produce same checksum as fromFile for same content', async () => {
			const stream = createReadStream(TEST_FILE);
			const streamChecksum = await fromStream(stream);
			const fileChecksum = await fromFile(TEST_FILE);

			expect(streamChecksum).toBe(fileChecksum);
		});

		it('should handle stream errors', async () => {
			const stream = createReadStream(join(TEST_DIR, 'non-existent.txt'));
			await expect(fromStream(stream)).rejects.toThrow();
		});

		it('should handle buffer chunks', async () => {
			const stream = Readable.from([Buffer.from('Hello, World!')]);
			const checksum = await fromStream(stream);

			expect(checksum).toBe('EC4AC3D0');
		});

		it('should handle mixed buffer and string chunks', async () => {
			const stream = Readable.from([Buffer.from('Hello'), ', ', Buffer.from('World!')]);

			const checksum = await fromStream(stream);

			expect(checksum).toBe('EC4AC3D0');
		});
	});
});
