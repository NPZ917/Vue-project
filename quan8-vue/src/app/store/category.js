// import http from '../util/http.js';
import API from '../util/api.js';
export  default  {
        namespaced: true,
        state: {
                activeId: 0,                    //记录当前激活的以及分类id
                list: [],                           //记录所有分类信息
                fids: []                            //记录用户看过的fid
        },
        getters: {
                subList: function(state) {
                        return state.activeId === 0 ? [] : state.list.filter(item => item.fid === state.activeId);
                }
        },
        mutations: {
                // 向state中的list中追加新的数据
                _appendData: function(state, payload) {
                        state.list = state.list.concat(payload);
                },
                _recordFid: function(state, payload) {
                        state.fids.push(payload);
                },
                _toggleId: function(state, payload) {
                        state.activeId = payload;
                }
        },
        actions: {
                _getData({ commit }, fid) {
                        // return  http({ method: 'get', url: '/category/list/' + fid })
                        return API.category.getData(fid)
                                .then(data =>{
                                        commit('_recordFid', fid);
                                        commit('_appendData', data);
                                        return data;
                                });
                },
                toggleId({ state, commit, dispatch }, id) {
                        commit('_toggleId', id);
                        if(state.fids.indexOf(id) !== -1) return Promise.resolve();
                        return dispatch('_getData', id)
                },
                //初始化一级分类,并默认让第一个一级分类激活,并请求第一个一分类对应二级分类
                init: function({ state, dispatch }) {
                        if(state.activeId !== 0) return Promise.resolve([state.list[0]]);       //已经请求一分类数据,不做
                        return dispatch('_getData', 0);
                }
        }
};