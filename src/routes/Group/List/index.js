import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const List = require('./containers/listContainer').default
      const reducer = require('./modules/list').default
      injectReducer(store, { key: 'list', reducer })
      cb(null, List)
    })
  }
})
