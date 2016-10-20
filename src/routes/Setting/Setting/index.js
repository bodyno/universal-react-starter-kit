import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'setting',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Setting = require('./containers/settingContainer').default
      const reducer = require('./modules/setting').default
      injectReducer(store, { key: 'setting', reducer })
      cb(null, Setting)
    })
  }
})
