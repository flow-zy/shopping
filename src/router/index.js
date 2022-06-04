import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginBox.vue')
  }, {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import('../components/HomeIndex.vue'),
    children: [{
      path: '/welcome',
      component: () => import('../components/WelcomeS')
    }, {
      path: '/users',
      component: () => import('../components/users/UsersList.vue')
    }, {
      path: '/rights',
      component: () => import('../components/power/PowerList')
    }, {
      path: '/roles',
      component: () => import('../components/power/RolesList')
    }, {
      path: '/goods',
      component: () => import('../components/categories/CategoriesList')
    }, {
      path: '/params',
      component: () => import('../components/categories/CategoriesParameter')
    }, {
      path: '/categories',
      component: () => import('../components/categories/CategoriesSort')
    }, {
      path: '/orders',
      component: () => import('../components/order/OrderList')
    }, {
      path: '/params',
      component: () => import('../components/categories/CategoriesParameter')
    }, {
      path: '/reports',
      component: () => import('../components/reports/ReportsType')
    }, {
      path: '/goods/add',
      component: () => import('../components/categories/GoodsAdd')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表从那个路径跳转而来
  // next是一个函数，代表放行
  if (to.path == '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (tokenStr) return next();
  next('/login')
})
export default router