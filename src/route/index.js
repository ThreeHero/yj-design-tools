const { globSync } = require('glob')
const { resolve } = require('path')

const resolvePath = (...path) => resolve(process.cwd(), ...path)
const replaceIndex = path => path.replaceAll('\\', '/').replace(/(\/index)?\.[jt]sx?/g, '')

const whiteRoute = ['api', 'components', 'map']

const files = globSync('**/*.*(js|jsx|ts|tsx)', {
  cwd: resolvePath('src/pages')
})
  .map(item => {
    const route = replaceIndex(item)
    if (whiteRoute.includes(route.split('/').at(1))) {
      // 白名单内
      return null
    }
    return route
  })
  .filter(Boolean)

module.exports = files
