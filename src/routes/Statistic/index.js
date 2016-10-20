import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/statistic',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Withdraw = require('./containers/statisticContainer').default
      const reducer = require('./modules/statistic').default
      injectReducer(store, { key: 'statistic', reducer })
      cb(null, Withdraw)
    })
  }
})
