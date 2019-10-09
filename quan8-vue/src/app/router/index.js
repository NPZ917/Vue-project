//当前应用程序路由核心配置文件
import Vue from 'vue';      //导入vue
import Router from 'vue-router';   //导入vue-router
// 导入所有的页面及组件
import page from '../page';


Vue.use(Router);                  //向vue体系注册vue-router体系中的组件

//创建核心路由对象
const router = new Router({
    mode: 'hash',
   routes: [
           { path: '/', redirect: '/home' },

           { path:'/home', component: page.Home },
           { path:'/category', component: page.Category },
           {
                   path:'/list/:mId/:sId',
                   component: page.List ,
                   meta: { keepAlive:true }
           },
           {path:'/detail/:id', component: page.Detail },
           {
                   path: '/cart',
                   component: page.Cart,
                   meta: { authenticate: true }
           },
           { path:'/ship', component: page.Ship },
           { path:'/profile', component: page.Profile },
           {
                   path: '/address',
                   component: page.Address,
                   meta: {
                           keepAlive: true,
                           authenticate: true
                   }
           },
           { path:'/login', component: page.Login, name: 'login' },
           { path: '/orderconfirm', component: page.OrderConfirm },
           { path: '/payment', component: page.Payment },
           { path: '/order', component: page.Order }
   ]
});

//定制路由全局守卫(每当切换路由进入新的路由前都会被自动调用)
router.beforeEach((to, from, next) => {
        if(to.meta.authenticate && !sessionStorage.getItem('token'))
                router.push({ name: 'login', params: { reference: to.fullPath } });
        //如果是直接访问登录页面或是http 401 跳的登录
        else if(to.fullPath === '/login' && !to.params.reference) {
                to.params.reference = from.fullPath;
                next();
        }
        else
                next();
});


//导出核心路由对象
export default router;