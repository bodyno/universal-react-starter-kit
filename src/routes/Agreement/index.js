import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'agreement',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Agreement = require('./containers/AgreementContainer').default
      const reducer = require('./modules/agreement').default
      injectReducer(store, { key: 'agreement', reducer })
      cb(null, Agreement)
    })
  }
})
