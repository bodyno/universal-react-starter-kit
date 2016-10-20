export default (store) => ({
  path: 'all',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const All = require('./components/All').default
      cb(null, All)
    })
  }
})
