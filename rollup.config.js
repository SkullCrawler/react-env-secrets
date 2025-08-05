import typescript from 'rollup-plugin-typescript2';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    'react',
    'react-dom',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      clean: true,
    }),
  ],
};