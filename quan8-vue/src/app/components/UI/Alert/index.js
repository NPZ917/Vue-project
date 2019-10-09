import Vue from 'vue';

const AlertConstructor = Vue.extend(require('./Alert.vue').default);

export default text => {
        let instance = new AlertConstructor ({ data: { text } }).$mount();
        document.body.appendChild(instance.$el);
}