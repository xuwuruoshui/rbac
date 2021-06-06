import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// import axios  from 'axios'
import request  from './request'


require("./mock")

Vue.use(Element)
//Vue.prototype.$axios = axios 
Vue.prototype.$axios = request 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
