// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './common/styl/index.styl'
import './common/css/iconfont.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./common/img/logo.png')
})
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
