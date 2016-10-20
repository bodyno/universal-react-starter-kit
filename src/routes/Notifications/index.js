import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/notifications',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Notifications = require('./containers/NotificationsContainer').default
      const reducer = require('./modules/notifications').default
      injectReducer(store, { key: 'notifications', reducer })
      cb(null, Notifications)
    })
  }
})
