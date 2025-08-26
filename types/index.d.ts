declare namespace SimpleFileValidation {
	type Algorithm = "crc32" | "md5" | "sha1" | "sha256" | "sha512";

	type FileMap = {
		checksum: string;
		file: string;
	};
}

export default SimpleFileValidation;
