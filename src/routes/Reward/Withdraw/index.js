import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'withdraw',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Withdraw = require('./containers/withdrawContainer').default
      const reducer = require('./modules/withdraw').default
      injectReducer(store, { key: 'withdraw', reducer })
      cb(null, Withdraw)
    })
  }
})
