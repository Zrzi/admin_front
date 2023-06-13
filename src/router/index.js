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

const Classrooms = () => import('../views/test/classrooms');
const GetTestSchedule = () => import('../views/test/getTestschedule');
const SetTestSchedule = () => import('../views/test/setTestschedule');

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
          resourceId: 'R5197664e9df34269b99da27e5c33483f'
        }
      },
      {
        path: 'classrooms',
        name: 'classrooms',
        component: Classrooms,
        meta: {
          title: '教室详情列表',
          requireAuth: false,
          resourceId: ''
        }
      },
      {
        path: 'getTestSchedule',
        name: 'getTestSchedule',
        component: GetTestSchedule,
        meta: {
          title: '考试安排通知',
          requireAuth: false,
          resourceId: ''
        }
      },
      {
        path: 'setTestSchedule',
        name: 'setTestSchedule',
        component: SetTestSchedule,
        meta: {
          title: '课程考试安排',
          requireAuth: false,
          resourceId: ''
        }
      },
      {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/practice/Home.vue'),
        redirect: '/home1',
        meta: { title: '主页' },
        children: [
          {
            path: '/information',
            name: 'information',
            component: () => import('../views/practice/information.vue'),
            meta: {
              title: '个人信息',
              requireAuth: false,
              resourceId: ''
            },
          },
          {
            path: '/home1',
            name: 'home1',
            component: () => import('../views/practice/home1.vue'),
            meta: {
              title: '主页',
              requireAuth: false,
              resourceId: ''
            },
          },

          {
            path: '/Header',
            name: 'Header',
            component: () => import('../views/practice/Header.vue')
          },

          {
            path: '/student',
            name: 'student',
            component: () => import('../views/practice/student.vue'),
            meta: {
              title: '学生组队',
              requireAuth: false,
              resourceId: ''
            },
          },
          {
            path: '/course',
            name: 'course',
            component: () => import('../views/practice/course.vue'),
            meta: {
              title: '实习名单确认',
              requireAuth: false,
              resourceId: ''
            },
          },
          {
            path: '/studentIntroduce',
            name: 'studentIntroduce',
            component: () => import('../views/practice/studentIntroduce.vue'),
            meta: {
              title: '个人简历',
              requireAuth: false,
              resourceId: ''
            },
          },
          {
            path: '/score',
            name: 'score',
            component: () => import('../views/practice/score.vue'),
            meta: {
              title: '实习成绩评定',
              requireAuth: false,
              resourceId: ''
            }
          },

          {
            path: '/innovation',
            name: 'innovation',
            component: () => import('../views/practice/innovation.vue'),
            meta: {
              title: '实践过程管理',
              requireAuth: false,
              resourceId: ''
            }
          },

          {
            path: '/honor',
            name: 'honor',
            component: () => import('../views/practice/honor.vue'),
            meta: {
              title: '实训学生组队',
              requireAuth: false,
              resourceId: ''
            }
          },

          {
            path: '/activity',
            name: 'activity',
            component: () => import('../views/practice/activity.vue'),
            meta: {
              title: '实训学生选题',
              requireAuth: false,
              resourceId: ''
            }
          },

          {
            path: '/dailyRecord',
            name: 'dailyRecord',
            component: () => import('../views/practice/daily.vue'),
            meta: {
              title: '课题管理',
              requireAuth: false,
              resourceId: ''
            }
          },
          {
            path: '/blog',
            name: 'blog',
            component: () => import('../views/practice/blog.vue'),
            meta: {
              title: '实习任务详情',
              requireAuth: false,
              resourceId: ''
            }
          },
          //底下这些好像是否访问都差不多,先不展示了吧
          {
            path: '/BaseForm',
            name: 'BaseForm',
            component: () => import('@/components/BaseForm.vue')
          },
          {
            path: '/JumpForm',
            name: 'JumpForm',
            component: () => import('@/components/JumpForm.vue')
          },
          {
            path: '/comment',
            name: 'comment',
            component: () => import('../views/practice/Comment.vue'),
            meta: {
              title: '学生互评',
              requireAuth: false,
              resourceId: ''
            }
          },
          {
            path: '/teachIntroduce',
            name: 'teachIntroduce',
            component: () => import('../views/practice/teachIntroduce.vue'),
            meta: {
              title: '教师主页',
              requireAuth: false,
              resourceId: ''
            }
          }
        ]
      },
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
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/practice/404.vue')
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
  return httpAuthority.get('/authority/checkAuthority', {params: {resourceId: resourceId}});
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
