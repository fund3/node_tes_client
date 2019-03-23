/**
 * Rollup bundle
 * Pros: 
 * 1) treeshaking for es modules
 * 2) output nodejs valid module - cjs
 */
import babel from 'rollup-plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';

module.exports = {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      autoExternal()
    ],
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      sourceMap: 'inline'
    }
};