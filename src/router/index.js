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

import store from "@/store/index"

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      requireAuth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      requireAuth: true
    },
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: {
          title: '用户管理',
          requireAuth: true
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: '角色管理',
          requireAuth: true
        },
        children: [
          {
            path: 'role',
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
          title: '系统管理',
          requireAuth: true
        }
      },
      {
        path: 'excels',
        name: 'excels',
        component: Excels,
        meta: {
          title: 'excel映射管理',
          requireAuth: true
        },
        children: [
          {
            path: ':id',
            name: 'excel',
            component: Excel,
            meta: {
              requireAuth: true
            }
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
      title: '资源管理',
      requireAuth: true
    }
  },
  {
    path: '',
    redirect: 'login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      next({path: '/login'})
    }
  } else {
    if (store.state.token) {
      next({path: '/home'})
    } else {
      next();
    }
  }
});

export default router
