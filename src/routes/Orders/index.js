import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/orders',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/orders/all')
    }
  },
  childRoutes: [
    {
      path: '/orders/:type',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const Withdraw = require('./containers/orderContainer').default
          const reducer = require('./modules/order').default
          injectReducer(store, { key: 'order', reducer })
          cb(null, Withdraw)
        })
      }
    }
  ]
})
