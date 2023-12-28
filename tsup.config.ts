import { defineConfig } from 'tsup';

export default defineConfig({
	target: 'esnext',
  clean: true,
  dts: true,
  entry: ['src/sfv.ts'],
  format: 'esm',
  minify: true,
	outDir: 'lib',
  treeshake: 'recommended'
});
