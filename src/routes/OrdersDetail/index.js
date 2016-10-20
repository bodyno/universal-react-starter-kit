import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/order/:type/detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const OrdersDetail = require('./containers/detailContainer').default
      const reducer = require('./modules/detail').default
      injectReducer(store, { key: 'detail', reducer })
      cb(null, OrdersDetail)
    })
  }
})
