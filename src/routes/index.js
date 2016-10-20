// 只需要导入必要的模块在初始化加载
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Statistic from './Statistic'
import Reward from './Reward'
import OrdersDetail from './OrdersDetail'
import Orders from './Orders'
import Books from './Books'
import Apply from './Apply'
import Group from './Group'
import Generalize from './Generalize'
import Family from './Family'
import Custom from './Custom'
import Notifications from './Notifications'
import Setting from './Setting'
import Frozen from './Frozen'
import Agreement from './Agreement'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    Reward(store),
    Statistic(store),
    OrdersDetail(store),
    Orders(store),
    Books(store),
    Apply(store),
    Group(store),
    Generalize(store),
    Family(store),
    Custom(store),
    Notifications(store),
    Setting(store),
    Frozen(store),
    Agreement(store),
    PageNotFound(),
    Redirect
  ]
})

export default createRoutes
