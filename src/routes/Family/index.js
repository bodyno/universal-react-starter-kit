import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'family',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Generalize = require('./containers/familyContainer').default
      const reducer = require('./modules/family').default
      injectReducer(store, { key: 'family', reducer })
      cb(null, Generalize)
    })
  }
})
