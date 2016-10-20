import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'feedback',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Feedback = require('./containers/feedbackContainer').default
      const reducer = require('./modules/feedback').default
      injectReducer(store, { key: 'feedback', reducer })
      cb(null, Feedback)
    })
  }
})
