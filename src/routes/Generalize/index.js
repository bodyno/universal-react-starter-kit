import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'generalize',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Generalize = require('./containers/generalizeContainer').default
      const reducer = require('./modules/generalize').default
      injectReducer(store, { key: 'generalize', reducer })
      cb(null, Generalize)
    })
  }
})
