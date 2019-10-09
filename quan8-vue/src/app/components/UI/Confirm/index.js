import Vue from 'vue';

const ConfirmConstructor = Vue.extend(require('./Confirm.vue').default);

export default text => {
        return new Promise(resolve => {
                let instance = new ConfirmConstructor ({ data: { text, resolve} }).$mount();
                document.body.appendChild(instance.$el);
        });
};