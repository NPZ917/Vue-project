import API from '../util/api.js';

export default {
        namespaced: true,
        state: {
                list: []
        },
        mutations: {
                _init(state, payload) {
                        state.list =  payload;
                },
                _setDefault(state, payload) {state.list.forEach(item => item.isDefault = item.id === payload ? 1 : 0); },
                _remove(state, payload) {
                        let i = state.list.findIndex(item => item.id === payload);
                        if(i !== -1) state.list.splice(i, 1);
                },
                _add(state, payload) { state.list.push(payload); },
                _update(state, payload) {
                        let i = state.list.findIndex(item => item.id === payload.id);
                        if(i !== 1) state.list.splice(i, 1, payload);
                }
        },
        actions: {
                init({ commit }) {
                        return API.address.list().then(data => commit('_init', data));
                },
                setDefault({ commit }, payload) {
                        return API.address.setDefault(payload).then(() => commit('_setDefault', payload));
                },
                remove({ commit }, payload) {
                        return API.address.remove(payload).then(() => commit('_remove', payload));
                },
                add({ commit, state, dispatch }, payload) {
                        return API.address.add(payload)
                                .then(id => {
                                        commit('_add', Object.assign({}, payload, { id }));
                                        return id;
                                })
                                .then(id => {
                                        if(state.list.length === 1) return dispatch('_setDefault', id);
                                });
                },
                update({ commit }, payload) {
                        return API.address.update(payload)
                                .then(() => commit('_update', Object.assign({}, payload)));
                }
        }
}