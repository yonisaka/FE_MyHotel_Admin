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
          path: '/hotel',
          name: 'hotel',
          component: () => import(/* webpackChunkName: "demo" */ './views/Hotel.vue')
        },
        {
          path: '/insert_objek',
          name: 'insert objek',
          component: () => import(/* webpackChunkName: "demo" */ './views/Insert_objek.vue')
        },
        {
          path: '/insert_hotel',
          name: 'insert hotel',
          component: () => import(/* webpackChunkName: "demo" */ './views/Insert_hotel.vue')
        },
        {
          path: '/edit_hotel',
          name: 'edit hotel',
          component: () => import(/* webpackChunkName: "demo" */ './views/Edit_hotel.vue')
        },
        {
          path: '/edit_hotel/:id',
          name: 'edit hotel',
          component: () => import(/* webpackChunkName: "demo" */ './views/Edit_hotel.vue')
        },
        {
          path: '/edit_objek/:id',
          name: 'edit objek',
          component: () => import(/* webpackChunkName: "demo" */ './views/Edit_objek.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
    }

    

  ]
})
