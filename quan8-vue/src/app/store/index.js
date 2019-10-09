//创建仓库对象
import Vue from 'vue';
import Vuex from 'vuex';

//导入所有子仓库
import category from './category.js';
import product from './product.js';
import loading from './loading.js';
import cart from './cart.js';
import address from './address.js';

Vue.use(Vuex);

const store = new Vuex.Store({
        modules: { category, product, loading, cart, address },
        state: { },
        getters: {},
        mutations: { },
        actions: {}
});

export default store;
