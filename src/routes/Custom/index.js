import List from './List'
import Add, { Edit } from './Add'

export default (store) => ({
  path: '/custom',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/custom/list')
    }
  },
  childRoutes: [
    List(store),
    Add(store),
    Edit(store)
  ]
})
