import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import share from 'components/Share/modules/share'
import bookList from 'components/BookList/modules/bookList'
import core from 'reducer/core'
import withdraw from 'routes/Reward/Withdraw/modules/withdraw'

// Fix: "React-Redux: Combining reducers: Unexpected Keys"
// http://stackoverflow.com/a/33678198/789076
const initialReducers = {
  counter: (state = 0) => state,
  zen: (state = require('../routes/Zen/modules/zen').initialState) => state,
  home: (state = require('../routes/Home/modules/home').initialState) => state
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    share,
    core,
    bookList,
    withdraw,
    router,
    ...initialReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
