import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'part',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Part = require('./containers/partContainer').default
      const reducer = require('./modules/part').default
      injectReducer(store, { key: 'part', reducer })
      cb(null, Part)
    })
  }
})
