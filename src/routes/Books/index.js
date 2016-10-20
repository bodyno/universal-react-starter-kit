import AllBooks from './AllBooks'
import NewBooks from './NewBooks'
import Article from './Article'

export default (store) => ({
  path: '/books',
  indexRoute: {
    onEnter (nextState, replace) {
      replace('/books/all')
    }
  },
  childRoutes: [
    AllBooks(store),
    NewBooks(store),
    Article(store)
  ]
})
