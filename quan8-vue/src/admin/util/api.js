import http from './http.js';
// 我负责和服务器对接
export default {
        category: {
                getData(fid) { return http({ method: 'get', url: '/category/list/' + fid}); },
                // [fid, avatar , name]
                addCategory(ajaxData) {
                        return http({ url: '/category/add', data: ajaxData});
                },
                // [id: ? , avatar]
                removeCategory(ajaxData) {
                        return http({ url: '/category/remove', data: ajaxData });
                },
                // [id, avatar,name,oldAvatar]
                updateCategory(ajaxData) {
                        return http({ url: '/category/update', data: ajaxData });
                }
        },
        user: {
                login(ajaxData) {
                        return http({ url: '/user/login/admin', data: ajaxData });
                },
                changePwd(ajaxData) {
                        return http({ url: '/user/changepwd', data: ajaxData, withToken: true });
                }
        }
}