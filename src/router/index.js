import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'

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
];

export default routes;