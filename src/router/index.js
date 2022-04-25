import Vue from 'vue'
import VueRouter from 'vue-router'
//vuetify提供的定位功能，回到上一个路由的时候可以定位到之前的位置
import goTo from 'vuetify/es5/services/goto'

import Index from '../views/Index.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/layout',
    name: 'Layout',
    component:Layout,
    // redirect: '/layout/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: Index
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('../views/Message.vue')
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('../views/Tags.vue')
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetail.vue')
      },
      {
        path: 'write',
        name: 'Write',
        component: () => import('../views/Write.vue')
      },

      {
        path: 'my/:id',
        name: 'My',
        component: () => import('../views/My.vue'),
        redirect: 'my/:id/userinfo',
        children: [
          {
            path: 'userinfo',
            name: 'UserInfo',
            component: () => import('../views/UserInfo.vue')
            // clidren:[

            // ]
          },
          {
            path: 'about',
            name: 'About',
            component: () => import('../views/About.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/Regist.vue')
  }
]

const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    return goTo(scrollTo)
  },
  routes
})

export default router
