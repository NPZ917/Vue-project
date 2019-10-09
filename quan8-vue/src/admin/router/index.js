import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../pages';

Vue.use(Router);

const router = new Router({
        routes: [
                { path: '/', redirect: '/login' },
                { path: '/login', component: Pages.Login },
                { path: '/home', component: Pages.Home }
        ]
});

router.beforeEach((to, from, next) => {
        if(to.fullPath === '/home' && !sessionStorage.getItem('name'))  next('/login');
        else next();
});

export default router;