import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'guide',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Guide = require('./containers/guideContainer').default
      const reducer = require('./modules/guide').default
      injectReducer(store, { key: 'guide', reducer })
      cb(null, Guide)
    })
  }
})
