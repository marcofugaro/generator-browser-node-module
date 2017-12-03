import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',<% if (!moduleField) { %>
  output: {
    file: pkg.main,
    format: 'umd',
    name: '<%= camelModuleName %>',
  },<% } else { %>
  output: [
		{
      file: pkg.main,
			format: 'umd',
			name: '<%= camelModuleName %>',
		},
		{
      file: pkg.module,
			format: 'es',
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
