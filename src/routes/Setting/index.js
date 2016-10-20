import Setting from './Setting'
import Guide from './Guide'
import Feedback from './Feedback'
import Address from './Address'

export default (store) => ({
  path: '/setting',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/setting/setting')
    }
  },
  childRoutes: [
    Setting(store),
    Guide(store),
    Feedback(store),
    Address(store)
  ]
})
