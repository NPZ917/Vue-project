import Vue from 'vue';
//创建Notice组件的构造器函数
const NoticeConstructor  = Vue.extend(require('./Notice.vue').default);


// 函数是组件（以函数调用的方式来动态创建组件并渲染）
export default text => {
        //代码的方式创建Notice组件对象并挂载
        let instance = new NoticeConstructor ({ data: { text } }).$mount();
        //将instance对应的dom对象显示在页面上
        document.body.appendChild(instance.$el);
}