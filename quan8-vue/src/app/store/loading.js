export default {
        namespaced: true,
        state: { isShow: false },
        mutations: {
                show: function(state) { state.isShow = true;},
                hide: function(state) { state.isShow = false; }
        }
};