import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  entry: 'src/index.js',<% if (!moduleField) { %>
  format: 'umd',
  moduleName: '<%= camelModuleName %>',
  dest: pkg.main,<% } else { %>
  targets: [
		{
			format: 'umd',
			moduleName: '<%= camelModuleName %>',
			dest: pkg.main,
		},
		{
			format: 'es',
			dest: pkg.module,
		},
	],<% } %>
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
