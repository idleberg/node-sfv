import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import * as SFV from '../src/sfv';

const testFile = resolve(cwd(), 'tests/fixtures', 'udhr.txt');
const testFiles = resolve(cwd(), 'tests/fixtures', '*.txt');

const checksums = {
	lorem_ipsum: {
		crc32: '98B2C5BD',
		md5: 'MD5:DB89BB5CEAB87F9C0FCC2AB36C189C2C',
		sha1: 'SHA1:CD36B370758A259B34845084A6CC38473CB95E27',
		sha256: 'SHA256:2D8C2F6D978CA21712B5F6DE36C9D31FA8E96A4FA5D8FF8B0188DFB9E7C171BB',
		sha512:
			'SHA512:8BA760CAC29CB2B2CE66858EAD169174057AA1298CCD581514E6DB6DEE3285280EE6E3A54C9319071DC8165FF061D77783100D449C937FF1FB4CD1BB516A69B9',
	},
	udhr: {
		crc32: 'FD6772B0',
		md5: 'MD5:90107D2ECBA9A6F7A02A37919828C668',
		sha1: 'SHA1:57F314C2E6E0DD9A003450AD1C9A03C27BAB418A',
		sha256: 'SHA256:30E8A7FD77190EB9EA6379C75C01CE55B660BF329A875F4D0B0AC99C24CEB04C',
		sha512:
			'SHA512:ADB861B5FE31D660489DA97C38BC04292C2DFF6AC855DE6FF90B63551338092835E28144B25743E2122CCF9E63EE2CD1135DBE35278F2106BC652123AB3BC69D',
	},
};

function mapChecksum(algorithm) {
	return Object.keys(checksums).map((item) => {
		return {
			checksum: checksums[item][algorithm],
			file: `tests/fixtures/${item}.txt`,
		};
	});
}

function slugify(algorithm) {
	return algorithm.trim().toLowerCase().replace('-', '');
}

// Tests
['CRC32', 'MD5', 'SHA-1', 'SHA-256', 'SHA-512'].forEach((algorithm) => {
	const test = suite(algorithm);
	const algorithmSlug = slugify(algorithm);

	test(`${algorithm}: Read file stream`, async () => {
		const expected = checksums['udhr'][algorithmSlug];
		const actual = await SFV.fromStream(createReadStream(testFile), algorithmSlug);

		assert.is(actual, expected);
	});

	test(`${algorithm}: Read single file`, async () => {
		const expected = checksums['udhr'][algorithmSlug];
		const actual = await SFV.fromFile(testFile, algorithmSlug);

		assert.is(actual, expected);
	});

	test(`${algorithm}: Read many files`, async () => {
		const expected = mapChecksum(algorithmSlug).sort((a, z) => a.file.localeCompare(z.file));
		const actuals = (await SFV.fromFiles(testFiles, algorithmSlug)).sort((a, z) => a.file.localeCompare(z.file));

		actuals.forEach((actual, index) => {
			assert.is(actual.file, expected[index].file);
			assert.is(actual.checksum, expected[index].checksum);
		});
	});

	test.run();
});
