//所有vue组件的母亲是Vue，父亲是Vue。prototype.js规定父亲既有属性和方法儿子自动具有
import Vue from 'vue';
import notice from './Notice';
import alert from './Alert';
import confirm from './Confirm';

Vue.prototype.$notice = notice;
Vue.prototype.$alert = alert;
Vue.prototype.$confirm = confirm;