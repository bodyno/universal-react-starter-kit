import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const SET_ID = 'SET_ID_ARTICLE'
const REQUEST_DATA = 'REQUEST_DATA_ARTICLE'
const RECEIVE_DATA = 'RECEIVE_DATA_ARTICLE'
const PAGE_CHANGE = 'PAGE_CHANGE_ARTICLE'

// ------------------------------------
// Actions
// ------------------------------------

function requestDataHandle () {
  return {
    type: REQUEST_DATA
  }
}

function receiveData (data) {
  return {
    type: RECEIVE_DATA,
    payload: data
  }
}

export function requestData () {
  return (dispatch, getState) => {
    dispatch(requestDataHandle())
    const state = getState().article
    ajax.get(`/goods/${state.id}/contents`, {
      params: {
        page: state.page,
        per_page: state.per_page,
      }
    }).then(({data}) => {
      dispatch(receiveData(data))
    })
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
    if (!per_page) per_page = getState().article.per_page
    dispatch(changePageHandle(page, per_page))
    dispatch(requestData())
  }
}

export function setId (id) {
  return {
    type: SET_ID,
    payload: id
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DATA]: (state) => {
    return ({...state, isFetching: true})
  },
  [RECEIVE_DATA]: (state, action) => {
    return ({...state, items: action.payload.items, total_count:action.payload.total_count, isFetching: false})
  },
  [PAGE_CHANGE]: (state, action) => {
    return ({...state, page: action.payload.page, per_page: action.payload.per_page})
  },
  [SET_ID]: (state, action) => {
    return ({...state, id: action.payload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  id: null,
  fetching: false,
  items: null,
  total_count: 0,
  page: 0,
  per_page: 10,
}
export default function (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
