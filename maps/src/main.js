// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import 'vue-material/dist/vue-material.css'

var VueMaterial = require('vue-material')
var VueFire = require('vuefire')
var Firebase = require('firebase')

Vue.use(VueMaterial)
Vue.use(VueFire)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
