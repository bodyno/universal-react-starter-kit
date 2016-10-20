import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'address',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Setting = require('./containers/AddressContainer').default
      const reducer = require('./modules/address').default
      injectReducer(store, { key: 'address', reducer })
      cb(null, Setting)
    })
  }
})
