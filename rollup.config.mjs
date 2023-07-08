import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'

const extensions = ['.js', '.jsx'];

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/my-component-library.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/my-component-library.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ extensions, babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
    resolve({ extensions }),
    commonjs(),
    scss()
  ],
  external: ['react', 'react-dom'],
};