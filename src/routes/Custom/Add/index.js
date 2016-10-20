import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'add',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Withdraw = require('./containers/CustomAddContainer').default
      const reducer = require('./modules/customAdd').default
      injectReducer(store, { key: 'customAdd', reducer })
      cb(null, Withdraw)
    })
  }
})

export const Edit = (store) => ({
  path: 'edit/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Withdraw = require('./containers/CustomAddContainer').default
      const reducer = require('./modules/customAdd').default
      injectReducer(store, { key: 'customAdd', reducer })
      cb(null, Withdraw)
    })
  }
})
