import ajax from 'components/Ajax'
import { isProd } from 'components/Common'

// ------------------------------------
// Constants
// ------------------------------------
const SET_INIT_DATA = 'SET_INIT_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function setInitData (data) {
  return {
    type: SET_INIT_DATA,
    payload: data
  }
}

export function getInitData () {
  return (dispatch, getState) => {
    ajax.get('/basic_data').then(({data}) => {
      dispatch(setInitData(data))
    })
  }
}

export function logout () {
  return (dispatch, getState) => {
    ajax({
      url: '/logout',
      method: 'post',
      baseURL: '/restapi/account/v1/'
    }).then(({data}) => {
      location.href = `https://account.baobaobooks.${ isProd() ? 'com' : 'net' }/login?continue=${encodeURIComponent(location.href)}`
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_INIT_DATA]: (state, action) => {
    return action.payload
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
