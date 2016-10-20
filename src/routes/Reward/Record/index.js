import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'record',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Record = require('./containers/recordContainer').default
      const reducer = require('./modules/record').default
      injectReducer(store, { key: 'record', reducer })
      cb(null, Record)
    })
  }
})
