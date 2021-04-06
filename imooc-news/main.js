import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import loading from "./components/loading/w-loading.vue";
Vue.component('loading', loading)

Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'
//今天是2021、3、17sss

const app = new Vue({

	...App
})
app.$mount()
