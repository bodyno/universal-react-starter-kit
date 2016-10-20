import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const New = require('./containers/NewContainer').default
      const reducer = require('./modules/new').default
      injectReducer(store, { key: 'booksNew', reducer })
      cb(null, New)
    })
  }
})
