import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Custom = require('./containers/CustomContainer').default
      const reducer = require('./modules/custom').default
      injectReducer(store, { key: 'custom', reducer })
      cb(null, Custom)
    })
  }
})
