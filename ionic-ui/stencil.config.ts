import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'IonicUI',
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist',
      esmLoaderPath: 'loader',
      copy: [{ src: '../dist/ionicui', dest: '../../../www/public/js/ionicui' }]
    }
  ]
}
