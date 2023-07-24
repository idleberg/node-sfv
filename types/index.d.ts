declare namespace SimpleFileValidation {
  function fromFile(inputFile: string, algorithm = 'crc32'): Promise<string>;
	function fromFiles(globString: string | string[], algorithm = 'crc32'): Promise<unknown[]>;
	function fromStream(stream: NodeJS.ReadableStream, algorithm = 'crc32'): Promise<string>;
}

export = SimpleFileValidation;
export as namespace SimpleFileValidation;
