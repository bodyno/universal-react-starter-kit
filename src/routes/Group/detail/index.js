import { injectReducer } from 'store/reducers'

export default (store) => ({
    path: 'detail/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Detail = require('./containers/detailContainer').default
            const reducer = require('./modules/detail').default
            injectReducer(store, { key: 'detail', reducer })
            cb(null, Detail)
        })
    }
})
