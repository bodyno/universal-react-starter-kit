import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'apply',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Apply = require('./containers/applyContainer').default
      const reducer = require('./modules/apply').default
      injectReducer(store, { key: 'apply', reducer })
      cb(null, Apply)
    })
  }
})
