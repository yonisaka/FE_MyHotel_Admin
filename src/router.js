import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/objek',
          name: 'objek',
          component: () => import(/* webpackChunkName: "demo" */ './views/Objek.vue')
        },
        {
          path: '/insert',
          name: 'insert',
          component: () => import(/* webpackChunkName: "demo" */ './views/Insert.vue')
        },
        {
          path: '/insert_objek',
          name: 'insert_objek',
          component: () => import(/* webpackChunkName: "demo" */ './views/Insert_objek.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
    }

    

  ]
})
