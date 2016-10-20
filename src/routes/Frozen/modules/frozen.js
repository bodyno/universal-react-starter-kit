// ------------------------------------
// Constants
// ------------------------------------
const CHANGE_TYPE = 'CHANGE_TYPE'
const REQUEST_DATA = 'REQUEST_DATA'
const RECEIVE_DATA = 'RECEIVE_DATA'

// ------------------------------------
// Actions
// ------------------------------------

export function changeType (type) {
  return {
    type: CHANGE_TYPE,
    payload: type
  }
}

function requestDate () {
  return {
    type: REQUEST_DATA
  }
}

function receiveData (value) {
  return {
    type: RECEIVE_DATA,
    payload: value
  }
}

export function fetchData () {
  return (dispatch, getState) => {
    if (getState().withdraw.isFetching) return

    dispatch(requestDate())
    return fetch('/api/posts')
      .then(data => data.text())
      .then(text => {
        dispatch(receiveData(JSON.parse(text)))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_TYPE]: (state, action) => {
    return ({...state, type: action.payload})
  },
  [REQUEST_DATA]: (state) => {
    return ({...state, isFetching:true})
  },
  [RECEIVE_DATA]: (state, action) => {
    return ({...state, isFetching:false, data: action.payload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  type: 'all',
  isFetching: false,
  data: []
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
