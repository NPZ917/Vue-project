import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './router';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
        el: '#app',
        components: { App },
        template: '<App/>',
        store,
        router
});