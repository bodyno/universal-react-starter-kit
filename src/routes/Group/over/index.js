import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'over',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Over = require('./containers/overContainer').default
      const reducer = require('./modules/over').default
      injectReducer(store, { key: 'over', reducer })
      cb(null, Over)
    })
  }
})
