import {createRouter, createWebHashHistory} from 'vue-router';

import store from "@/store/index";
import httpAuthority from "@/utils/httpAuthority";
import {ElMessage} from "element-plus";

const Login = () => import('../views/Login');
const Home = () => import('../views/Home');
const Users = () => import('../views/authority/Users');
const Roles = () => import('../views/authority/Roles');
const Role = () => import('../views/authority/Role');
const Systems = () => import('../views/authority/Systems');
const Excels = () => import('../views/excels/Excels');
const Resources = () => import('../views/authority/Resources');

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      requireAuth: false,
      resourceId: 'R5c434f48d34241e88144edc0ce9348e9'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      requireAuth: true,
      resourceId: 'R102e54f1c19541a48433e7134d39c38c'
    },
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: {
          title: '用户管理',
          requireAuth: true,
          resourceId: 'Rfd7d453ce918403ab0ccc4b7d00e6931'
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: '角色管理',
          requireAuth: true,
          resourceId: 'Rcf43fd93ba10489cbe5f651a4c405b3f'
        },
        children: [
          {
            path: 'role',
            name: 'role',
            component: Role,
            resourceId: 'Rfb45f4d2b0ce4751a66a892cfbc6ec96'
          }
        ]
      },
      {
        path: 'systems',
        name: 'systems',
        component: Systems,
        meta: {
          title: '系统管理',
          requireAuth: true,
          resourceId: 'Re6654c09a55943ba8e8c63826fdc7a26'
        }
      },
      {
        path: 'excels',
        name: 'excels',
        component: Excels,
        meta: {
          title: 'excel映射管理',
          requireAuth: false,
          resourceId: ''
        }
      }
    ]
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources,
    meta: {
      title: '资源管理',
      requireAuth: true,
      resourceId: 'R69411a9a7be94d3a87254dfed001585b'
    }
  },
  {
    path: '',
    redirect: 'login',
    meta: {
      requireAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const checkAuthority = function(resourceId) {
  // 返回promise对象
  if (!resourceId) {
    return Promise.reject('resourceId不存在');
  }
  return httpAuthority.get('/checkAuthority', {params: {resourceId: resourceId}});
}

router.beforeEach((to, from, next) => {
  let token = store.state.token || localStorage.getItem('token');
  if (to.meta.requireAuth) {
    if (token) {
      let resourceId = to.meta.resourceId;
      let promise = checkAuthority(resourceId);
      promise.then(res => {
        const result = res.data;
        let check = result.data;
        if (check) {
          document.title = to.meta.title || document.title;
          next();
        } else {
          ElMessage({
            message: '无权限',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          next(false);
        }
      }).catch(message => {
        next(false);
      });
      // document.title = to.meta.title || document.title;
      // next();
    } else {
      document.title = '登录';
      next({path: '/login'});
    }
  } else {
    if (to.path === '/login' && token) {
      document.title = '首页';
      next({path: '/home'});
    } else {
      document.title = to.meta.title || document.title;
      next();
    }
  }
});

export default router
