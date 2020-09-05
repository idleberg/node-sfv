import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  filesize(),
  nodePolyfills(),
  typescript({
    allowSyntheticDefaultImports: true
  })
];

export default [
  {
    external: [
      'crypto',
      'fs'
    ],
    input: './src/sfv.ts',
    output: {
      dir: 'lib',
      format: 'cjs'
    },
    plugins: plugins
  }
];
