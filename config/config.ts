// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base: '/admin/',
  publicPath: '/admin/',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      Routes: ['src/pages/Authorized'],
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/Confirm',
            },
            {
              name: '入库核验',
              icon: 'CheckCircleOutlined',
              path: '/Confirm',
              component: './Confirm',
            },
            {
              name: '核验完毕',
              icon: 'smile',
              path: '/confirmPass',
              component: './confirmPass',
            },
            {
              name: '计件查询/工资统计',
              icon: 'table',
              path: '/basic',
              component: './basic',
            },
            {
              name: '增加员工',
              icon: 'form',
              path: '/form',
              component: './basic-form',
            },
            {
              name: '员工信息查询/修改',
              icon: 'profile',
              path: '/userinfo',
              component: './userinfo',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'https://jijian.lichnow.com/api',
      changeOrigin: true,
      ws:true,
      pathRewrite: {'^/api': ''}
    },
  },
//https://jijian.lichnow.com/api
  manifest: {
    basePath: '/',
  },
});
