import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Login from '@/container/Login'
import Details from '@/container/Details'
import UserInfo from '@/container/UserInfo'
import ModifyPassword from '@/container/ModifyPassword'

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