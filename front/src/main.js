import Vue from 'vue'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import elementUI from 'element-ui'

import App from './App.vue'
import http from './api'

Vue.config.productionTip = false
Vue.use(elementUI)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
