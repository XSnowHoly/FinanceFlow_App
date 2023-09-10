import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Login from '@/container/Login'
import Details from '@/container/Details'

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
  }
];

export default routes;