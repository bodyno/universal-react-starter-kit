import ajax from 'components/Ajax'
import array from 'lodash/array'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_NOTI = 'REQUEST_NOTI'
const RECEIVE_NOTI = 'RECEIVE_NOTI'
const CHANGE_INDEX = 'CHANGE_INDEX_NOTI'
const PAGE_CHANGE = 'PAGE_CHANGE_NOTI'
const MARK_READ = 'MARK_READ_NOTI'

// ------------------------------------
// Actions
// ------------------------------------

function requestDataHandle () {
  return {
    type: REQUEST_NOTI
  }
}

function receiveData (data) {
  return {
    type: RECEIVE_NOTI,
    payload: data
  }
}

function changePageHandle (page, per_page) {
  return {
    type: PAGE_CHANGE,
    payload: {
      page,
      per_page
    }
  }
}

export function changePage (page, per_page) {
  return (dispatch, getState) => {
    if (!per_page) per_page = getState().notifications.per_page
    dispatch(changePageHandle(page, per_page))
    dispatch(requestData())
  }
}

export function changeIndex (id) {
  return {
    type: CHANGE_INDEX,
    payload: id
  }
}

export function requestData () {
  return (dispatch, getState) => {
    dispatch(requestDataHandle())
    const state = getState().notifications
    ajax.get('/notices', {
      params: {
        page: state.page,
        per_page: state.per_page,
      }
    }).then(({data}) => {
      dispatch(receiveData(data))
    })
  }
}

function markReadHandle (id) {
  return {
    type: MARK_READ,
    payload: id
  }
}

export function markRead (id) {
  return (dispatch, getState) => {
    ajax.put(`/notices/${id}`)
    dispatch(markReadHandle(id))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_NOTI]: (state, action) => {
    return ({...state, data: action.payload, total_count:action.payload.total_count, isFetching: false})
  },
  [REQUEST_NOTI]: (state) => {
    return ({...state, isFetching: true})
  },
  [CHANGE_INDEX]: (state, action) => {
    return ({...state, nowExpand: action.payload})
  },
  [PAGE_CHANGE]: (state, action) => {
    return ({...state, page: action.payload.page, per_page: action.payload.per_page})
  },
  [MARK_READ]: (state, action) => {
    const index = array.findIndex(state.data.items, {id: action.payload})
    let data = state.data.items[index]
    data.state = 1
    return ({...state, data: { ...state.data, items:[...state.data.items.slice(0, index), data, ...state.data.items.slice(index + 1)] }})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  nowExpand: null,
  isFetching: false,
  data: null,
  page: 1,
  per_page: 10,
  total_count: 0
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
