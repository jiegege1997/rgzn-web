import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.baseURL = "http://192.168.3.71:8083";
axios.defaults.baseURL = "http://139.9.126.19:8081";
// axios.defaults.baseURL = "http://11.39.72.215:8081";
Vue.prototype.$axios = axios;

Vue.use(VueAxios, axios);
