import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'
//今天是2021、3、17sss

const app = new Vue({
	
    ...App
})
app.$mount()
