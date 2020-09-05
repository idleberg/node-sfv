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
    output: {
      dir: 'lib',
      format: 'cjs'
    },
    plugins: plugins
  }
];
