import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const RECIEVE_CURADDRESS = 'RECIEVE_CURADDRESS'
const SET_CURADDRESS = 'SET_CURADDRESS'

// ------------------------------------
// Actions
// ------------------------------------

export function getCurAddress (data) {
  return {
    type: RECIEVE_CURADDRESS,
    preload: data
  }
}

export function requestCurAddress (data) {
  return (dispatch, getState) => {
    ajax.get('/user/store').then(({data}) => {
      dispatch(getCurAddress(data))
    })
  }
}

export function setCurAddress (data) {
  return {
    type: SET_CURADDRESS,
    payload: data
  }
}

export function putCurAddress (data) {
  return (dispatch, getState) => {
    ajax.put('/user/store', {
      address: data
    }).then(({data}) => {
      dispatch(setCurAddress(data))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECIEVE_CURADDRESS]: (state, action) => {
    return ({...state, data: action.preload})
  },
  [SET_CURADDRESS]: (state, action) => {
    return ({...state, data: action.payload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: null
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
