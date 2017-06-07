// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import vueResource from 'vue-resource'

//引入reset样式
import '../static/css/reset.css'
//引入common样式
import './common/sass/_common.sass'

//全局注册
Vue.use(vueResource)

Vue.config.productionTip = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
    }
  },
  router,
  template: '<App/>',
  components: { App }
})

router.push({name: "projects"})
