import List from './List'
import Apply from './Apply'
import Over from './Over'
import Detail from './Detail'

export default (store) => ({
  path: '/group',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/group/list')
    }
  },
  childRoutes: [
    List(store),
    Detail(store),
    Apply(store),
    Over(store)
  ]
})
