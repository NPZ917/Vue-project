//源代码入口文件

import Vue from 'vue';                //ES6导入语法
import router from './router';      //导入路由对象
import store from './store';           //导入仓库对象
import App from './App.vue';       //导入根组件
import './components/UI';                    //向vue注入公共函数组件

//创建根实例并将实例中的template指定内容渲染到el指定的挂载点
new Vue({
        //挂载点vue
        el: '#app',
        components: { App },
        template: '<App/>',
        router,
        store
});
