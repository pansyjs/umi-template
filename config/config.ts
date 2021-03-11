import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  targets: {
    ie: 11
  },
  antd: {
    config: {}
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true
  },
  webpack5: {
    lazyCompilation: {}
  },
  dynamicImport: {}
});
