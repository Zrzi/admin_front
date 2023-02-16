import { createRouter, createWebHashHistory  } from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/authority/Users';
import Roles from '@/views/authority/Roles';
import Role from '@/views/authority/Role';
import Systems from '@/views/authority/Systems';
import Excels from '@/views/excels/Excels';
import Excel from '@/views/excels/Excel';
import Resources from "@/views/authority/Resources";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: {
          title: '用户管理'
        },
        children: [
        ]
      },
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: '角色管理'
        },
        children: [
          {
            path: ':id',
            name: 'role',
            component: Role
          }
        ]
      },
      {
        path: 'systems',
        name: 'systems',
        component: Systems,
        meta: {
          title: '系统管理'
        }
      },
      {
        path: 'excels',
        name: 'excels',
        component: Excels,
        meta: {
          title: 'excel映射管理'
        },
        children: [
          {
            path: ':id',
            name: 'excel',
            component: Excel
          }
        ]
      }
    ]
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources,
    meta: {
      title: '资源管理'
    }
  },
  {
    path: '',
    redirect: 'home'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
