const pkg = require('./package.json')
const svelte = require('rollup-plugin-svelte')

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 *
 * @license
 * Copyright (c) 2018 ${pkg.author}
 * Released under the MIT license
 */`

function capitalize(name) {
  const camelized = name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
  return camelized[0].toUpperCase() + camelized.slice(1)
}

module.exports = {
  moduleName: capitalize(pkg.name),
  banner,
  plugin: [svelte()]
}
