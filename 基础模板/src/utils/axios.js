import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
Vue.prototype.$axios = axios

Vue.use(VueAxios, axios)
