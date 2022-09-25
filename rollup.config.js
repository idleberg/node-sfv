import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  filesize(),
  typescript({
    allowSyntheticDefaultImports: true
  })
];

export default [
  {
    external: [
      'crypto'
    ],
    input: './src/sfv.ts',
    output: [
			{
				file: 'lib/sfv.mjs',
				format: 'esm'
			},
			{
				file: 'lib/sfv.cjs',
				format: 'cjs'
			}
		],
    plugins: plugins
  }
];
