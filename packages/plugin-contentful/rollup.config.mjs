/**
 * Rollup build package
 * See: https://github.com/rollup/rollup-starter-lib
 *
 */
import pluginTypescript from '@rollup/plugin-typescript'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import rootPkg from '../../package.json' assert { type: 'json' }
import pkg from './package.json' assert { type: 'json' }

const moduleName = pkg.name.replace(/^@.*\//, '')
const author = rootPkg.author
const globals = {
  '@modelberry/mbfactory': '*',
  'contentful-management': '*',
  'fs/promises': '*',
  chalk: '*',
  deepmerge: '*',
  fs: '*',
  inquirer: '*',
  path: '*',
  typescript: '*',
}

const external = Object.keys(globals)

const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName} v${pkg.version}
   * Released under the ${rootPkg.license} license.
   */
  `

const plugins = [
  // so Rollup can find node modules
  pluginNodeResolve({
    preferBuiltins: true,
  }),
  // so Rollup can convert node modules to ES modules
  pluginCommonjs({
    extensions: ['.js', '.ts'],
  }),
  // so Rollup can convert TypeScript to JavaScript
  pluginTypescript({ tsconfig: 'tsconfig.json' }),
  json(),
]

export default [
  {
    external,
    input: './src/node.ts',
    output: [
      {
        banner,
        exports: 'named',
        file: `./build/node.mjs`,
        format: 'es',
        globals,
        sourcemap: false,
      },
      {
        banner,
        exports: 'named',
        file: `./build/node.cjs`,
        format: 'cjs',
        globals,
        sourcemap: false,
      },
    ],
    plugins,
  },
]
