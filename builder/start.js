const path = require('path')
const fs = require('fs')
const { context } = require('esbuild')
const plugins = require('./plugins')

const getOpts = (entryPoints, outdir) => ({
  entryPoints,
  outdir,
  bundle: true,
  format: 'esm',
  splitting: true,
  sourcemap: true,
  plugins,
  minify: false,
  loader: { '.webp': 'dataurl', '.svg': 'dataurl' },
  external: ['phoenix-builder']
})

module.exports = async ({ input, output, manifest }) => {
  const ctxList = []
  if (manifest) {
    const manifestFilePath = path.join(input, 'manifest.json')
    const manifestData = JSON.parse(fs.readFileSync(manifestFilePath, { encoding: 'utf8' }) || '{}')
    const { packageName, services } = manifestData
    if (!/^[a-zA-Z]+(\.[a-zA-Z]+)*$/.test(packageName)) {
      console.log('El nómbre del paquete no es válido!')
      return
    }
    const mainAppPath = path.join(input, 'main.ts')
    ctxList.push(context(getOpts([mainAppPath], output)))
    if (services) {
      const serviceNames = Object.keys(services)
      for (const nameService of serviceNames) {
        const serviceSrcDir = path.join(input, 'services', `${nameService}.ts`)
        const serviceOutDir = path.join(output, 'services')
        ctxList.push(context(getOpts([serviceSrcDir], serviceOutDir)))
      }
    }
  } else {
    if (fs.existsSync(output)) {
      fs.rmSync(output, { force: true, recursive: true })
    }
    const mainFile = path.join(input, 'main.ts')
    ctxList.push(context(getOpts([mainFile], output)))
  }
  const buildInstances = await Promise.all(ctxList)
  await Promise.all(buildInstances.map(ctx => ctx.watch()))
  console.log('Listo!')
  process.on('exit', async () => {
    for (const ctx of buildInstances) {
      await ctx.dispose()
    }
  })
}