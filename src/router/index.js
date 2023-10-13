import { lazy } from 'react';

// 使用 lazy 函数导入路由组件
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/container/Home'));
const Data = lazy(() => import(/* webpackChunkName: "Data" */ '@/container/Data'));
const User = lazy(() => import(/* webpackChunkName: "User" */ '@/container/User'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/container/Login'));
const Details = lazy(() => import(/* webpackChunkName: "Details" */ '@/container/Details'));
const UserInfo = lazy(() => import(/* webpackChunkName: "UserInfo" */ '@/container/UserInfo'));
const ModifyPassword = lazy(() => import(/* webpackChunkName: "ModifyPassword" */ '@/container/ModifyPassword'));

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/data',
    component: Data,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/details',
    component: Details,
  },
  {
    path: '/details',
    component: Details,
  },
  {
    path: '/userInfo',
    component: UserInfo,
  },
  {
    path: '/modifyPassword',
    component: ModifyPassword,
  }
];

export default routes;