import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'dist-custom-elements-bundle',
      dir: 'src/stencil-dist/client'
    },
    { 
      type: 'dist-hydrate-script',
      dir: 'src/stencil-dist/server'
    },
  ],
};
