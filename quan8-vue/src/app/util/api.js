import http from './http.js';
// 我负责和服务器对接
export default {
        category: {
                getData(fid) { return http({ method: 'get', url: '/category/list/' + fid}); }
        },
        cart: {
                getCartInfo() {
                        return http({ withToken: true, url: '/cart/list' });
                },
                increase(id, loadingEl) {
                        return http({ withToken: true, method: 'get', url: '/cart/increase/' + id, loading: false, loadingEl });
                },
                decrease(id, loadingEl) {
                        return http({ withToken: true, method: 'get', url: '/cart/decrease/' + id, loading: false, loadingEl });
                },
                remove(ids) {
                        return http({ withToken: true, url: '/cart/delete', data: { ids: JSON.stringify(ids) } });
                },
                settlement(ids, account, addressId) {
                        return http({ withToken: true, url: '/cart/settlement', data: { ids: JSON.stringify(ids), account, addressId } });
                },
                addProduct(pid, count) {
                        return http({ withToken: true, url: '/cart/addProduct', data: { pid, count } });
                },
                getCartCount() {
                        return http({ withToken: true, method: 'get', url: '/cart/getCount' });
                }
        },
        user: {
                loginByPwd(account, pwd, loadingEl) {
                        return http({ url: '/user/login/pwd', data: { account, pwd }, loading: false, loadingEl })
                },
        },
        product: {
                getList(ajaxData) {
                        return http({ url: '/product/list', data: ajaxData, loading: false });
                },
                getItem(id) {
                        return http({ url: '/product/model/' + id, method: 'get' });
                }
        },
        address: {
                list(){
                        return http({ url: '/address/list', withToken: true})
                },
                // ajaxData = { receiverName, receiveTel. receiveAddress, receiveAddressDetail }
                add(ajaxData) {
                        return http({ url: '/address/add', withToken:true,data: ajaxData })
                },
                update({ id, ...ajaxData }) {
                        console.log(ajaxData);
                        return http({ url: '/address/update/' + id, withToken: true, data: ajaxData });
                },
                remove(id) {
                        return http({ url: '/address/delete/' + id, withToken: true });
                },
                setDefault(id) {
                        return http({ url: '/address/default/' + id, withToken: true });
                }
        },
        order: {
                orderDetail() {
                        return http({ url:'/cart/getlist', withToken:true});
                }
        }
}