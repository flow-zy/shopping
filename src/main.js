import Vue from 'vue'
import App from './App.vue'
// 公共样式
import './assets/css/common.css'
// 路由
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
// 引入element-ui
import './plugins/element'
// 导入字体图标样式
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
//导入axios
import axios from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
// axios设置请求拦截器,设置响应头token
// 页面发送http请求，很多情况我们要对请求和其响应进行特定的处理，
axios.interceptors.request.use(
  config => {
    // console.log(config);
    //每次发送请求之前自动将在session中的token提取出来当做响应头header
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }
)
//把axios注册到Vue
Vue.prototype.$http = axios
//关闭vue在console中的默认提示
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')