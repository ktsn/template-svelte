const fs = require('fs')
const pkg = require('./package.json')
const svelte = require('rollup-plugin-svelte')
const postcss = require('postcss')
const customProperties = require('postcss-custom-properties')
const styleVars = require('./style-vars.json')

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
  plugin: [
    svelte({
      css: handleCss
    })
  ]
}

function handleCss({ code, map }) {
  postcss({
    plugins: [
      customProperties({
        variables: styleVars,
        appendVariables: true
      })
    ]
  })
    .process(code, {
      from: false,
      map: {
        prev: map
      }
    })
    .then(({ css, map }) => {
      fs.writeFileSync(`dist/${pkg.name}.css`, css)
      fs.writeFileSync(`dist/${pkg.name}.css.map`, map)
    })
}
