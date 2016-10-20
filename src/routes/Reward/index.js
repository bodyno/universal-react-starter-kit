import Withdraw from './Withdraw'
import Reward from './Reward'
import Part from './Part'
import Record from './Record'

export default (store) => ({
  path: '/reward',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/reward/reward')
    }
  },
  childRoutes: [
    Part(store),
    Withdraw(store),
    Reward(store),
    Record(store)
  ]
})
