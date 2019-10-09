import axios from 'axios';
import store from '../store';
import router from '../router';
import Vue from 'vue';
//一个永远是pending状态的promise
const alwaysPendingPromise = new Promise(() => {});

//返回一个promise对象
function http(options) {
        let defaultOptions = { method: 'post', loading: true, withToken: false };
        //显示loading组件
        options = Object.assign({}, defaultOptions, options);
        if(options.loading) store.commit('loading/show');
        if(options.loadingEl) {
                // 为指定的dom元素添加loading效果
                options.loadingEl.className += ' http-loading';
                // 禁用指定dom元素
                options.loadingEl.disabled = true;
        }
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                }
        }
        return axios(options)
                .then(response =>{
                        if(response.status === 200) return response.data || JSON.parse(response.request.responseText);
                        else throw new Error(response.statusText)
                })
                .then(result =>{
                        let {status, data, message} = result;
                        switch(status){
                                case 200:
                                        if(options.loading) setTimeout(() => store.commit('loading/hide'), 500);        //关闭loading
                                        if(options.loadingEl) {
                                                setTimeout(() => {
                                                        //成功：去除指定的dom元素的loading效果
                                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                                        options.loadingEl.disabled = false;
                                                }, 500)
                                        }
                                        if(message !== '') Vue.prototype.$alert(err.message);
                                        return data;
                                case 401:               //未登录
                                        sessionStorage.removeItem('token');                     //不管是否登录还是token过期大欧巴sessionStorage里的token清除掉
                                        message='您未登录或登录超时..';
                                        router.push('/login');          //路由跳转到登录
                                case 199:
                                case 500:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        if(options.loading) setTimeout(() => store.commit('loading/hide'), 500);        //关闭loading
                        //失败：去除指定的dom元素的loading效果
                        if(options.loadingEl) {
                                setTimeout(() => {
                                        //失败：去除指定的dom元素的loading效果
                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                        options.loadingEl.disabled = false;
                                }, 500)
                        }
                        Vue.prototype.$alert(err.message);
                        return alwaysPendingPromise;  //返回一个永远是pendging的promise
                })
}

export default http;