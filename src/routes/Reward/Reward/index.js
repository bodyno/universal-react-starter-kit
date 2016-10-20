import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'reward',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Reward = require('./containers/rewardContainer').default
      const reducer = require('./modules/reward').default
      injectReducer(store, { key: 'reward', reducer })
      cb(null, Reward)
    })
  }
})
