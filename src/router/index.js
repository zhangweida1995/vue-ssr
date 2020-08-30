import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRoute() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        redirect: '/list',
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('../page/list.vue'),
        meta: {
          title: 'list',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../page/home.vue'),
        meta: {
          title: 'home',
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../page/about.vue'),
        meta: {
          title: 'about',
        },
      },
    ],
  })
}
