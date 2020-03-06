import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import {postRequest} from "./utils/request"
import {postKeyValueRequest} from "./utils/request"
import {putRequest} from "./utils/request"
import {deleteRequest} from "./utils/request"
import {getRequest} from "./utils/request"
import router from "./router"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iconPicker)

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
