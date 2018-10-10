// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import acl from './acl'
import Vuetify from 'vuetify'
import 'font-awesome/css/font-awesome.css'
import store from '@/store/store'
import './theme/default.styl'
// import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/util/colors'
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  },
  options: {
    themeVariations: ['primary', 'secondary', 'accent']
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  acl,
  components: { App },
  template: '<App/>'
})
