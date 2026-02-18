// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // 'server' = デフォルトSSR（ページごとにSSGに切り替え可能）
  // 'static' = デフォルトSSG（デフォルト。今まではこれだった）
  output: 'server',
  integrations: [react()],

  adapter: node({
    mode: 'standalone'
  })
});