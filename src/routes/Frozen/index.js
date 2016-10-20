import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/frozen',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Frozen = require('./containers/FrozenContainer').default
      const reducer = require('./modules/frozen').default
      injectReducer(store, { key: 'frozen', reducer })
      cb(null, Frozen)
    })
  }
})
