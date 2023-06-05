#!/usr/bin/env node
'use strict';
(async argv => {
  const args = {}
  let curOpt = ''
  for (const thisOpt of argv) {
    const opt = thisOpt.trim().replace(/^\-+/, '')
    if (opt === thisOpt) {
      if (curOpt) {
        args[curOpt] = opt
      }
      curOpt = null
    } else {
      curOpt = opt
      args[curOpt] = true
    }
  }
  const command = argv[0]
  const { input, output, manifest = false, zipper = false } = args
  if ((command === 'start' || command === 'build') && input && output) {
    const path = require('path')
    const builder = require(`./${command}.js`)
    builder({ input: path.resolve(process.cwd(), input), output: path.resolve(process.cwd(), output), manifest, zipper })
  }
})(process.argv.slice(2))