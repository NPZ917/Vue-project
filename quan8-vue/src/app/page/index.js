//统一导入page文件下的所有页面组件,并统一导出,让page外面的文件在使用页面在使用页面级组件代码更加的优雅
import Home from './Home';
import Category from './Category';
import Ship from './Ship';
import Cart from './Cart';
import Profile from './Profile';
import Login from './Login';
import List from './List';
import Detail from './Detail';
import Address from './Address';
import OrderConfirm from './OrderConfirm';
import Payment from './Payment';
import Order from './Order';

export default {
        Home,
        Category,
        Ship,
        Cart,
        Profile,
        Login,
        List,
        Detail,
        Address,
        OrderConfirm,
        Payment,
        Order
};