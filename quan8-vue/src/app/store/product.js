// import http from '../util/http.js';
import API from '../util/api.js';
export default {
        namespaced: true,
        modules: {},
        state: {
                list: []                //保存商品列表的内容
        },
        getters: {},
        mutations: {
                _reset: function(state) { state.list =[];},
                _appendData: function(state,payload) {state.list = state.list.concat(payload);}
                // _updateList: function(state,payload) {state.list = payload;}
        },
        actions: {
                getData({ state, commit },payload) {
                        if(payload.start === 0) commit('_reset');
                        return new Promise(resolve => {
                                // http({ data: payload, url: '/product/list',  loading: false })
                                API.product.getList(payload)
                                        .then(data => {
                                                commit('_appendData', data);
                                                resolve(data.length);
                                        });
                        }) ;
                },
                getItem({ state }, payload) {
                        let target = state.list.find(item => item.id ===payload);
                        if(target) return Promise.resolve(target);
                        else return API.product.getItem(payload);
                }
        }
}