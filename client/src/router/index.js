import Vue from 'vue'
import Router from 'vue-router'
// import { AclRule } from 'vue-acl'
import dashboard from '@/components/Dashboard'
import notfound from '@/components/default/NotFound'
import register from '@/components/Register'
import login from '@/components/Login'
import deny from '@/components/default/Deny'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      meta: {
        rule: 'isGuest',
        private: false
      },
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/',
      name: 'root',
      meta: {
        rule: 'isGuest',
        private: false
      },
      redirect: {
        path: '/login'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        rule: 'isPublic',
        private: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        rule: 'isGuest',
        private: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        rule: 'isGuest',
        private: false
      }
    },
    {
      path: '/404',
      name: 'notfound',
      component: notfound,
      meta: {
        rule: 'isGuest',
        private: false
      }
    },
    {
      path: '/deny',
      name: 'deny',
      component: deny,
      meta: {
        rule: 'isGuest',
        private: false
      }
    }
  ]
})
