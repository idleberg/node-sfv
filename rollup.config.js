import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  typescript({
    allowSyntheticDefaultImports: true
  })
];

export default [
  {
    input: './src/sfv.ts',
    output: {
      dir: 'lib',
      format: 'cjs'
    },
    plugins: plugins
  }
];
