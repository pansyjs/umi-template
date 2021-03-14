import { defineConfig } from 'umi';
import { routes } from './routes';

export default defineConfig({
  hash: true,
  routes,
  targets: {
    ie: 11
  },
  antd: {
    config: {}
  },
  layout: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true
  },
  cssModulesTypescriptLoader: {
    mode: 'emit'
  },
  webpack5: {},
  dynamicImport: {}
});
