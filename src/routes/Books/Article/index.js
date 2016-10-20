import { injectReducer } from 'store/reducers'

export default (store) => ({
    path: 'article/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Article = require('./containers/articleContainer').default
            const reducer = require('./modules/article').default
            injectReducer(store, { key: 'article', reducer })
            cb(null, Article)
        })
    }
})
