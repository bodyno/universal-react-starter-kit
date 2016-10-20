import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_REWARD'
const RECEIVE_DATA = 'RECEIVE_DATA_REWARD'
const PAGE_CHANGE = 'PAGE_CHANGE_WITHDRAW'

// ------------------------------------
// Actions
// ------------------------------------

function requestDataHandle () {
  return {
    type: REQUEST_DATA
  }
}

function reiceveData (data) {
  return {
    type: RECEIVE_DATA,
    payload: data
  }
}

export function requestData () {
  return (dispatch, getState) => {
    dispatch(requestDataHandle())
    const state = getState().record
    ajax.get('/consumptions', {
      params: {
        page: state.page,
        per_page: state.per_page
      }
    }).then(({data}) => {
      dispatch(reiceveData(data))
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
    if (!per_page) per_page = getState().record.per_page
    dispatch(changePageHandle(page, per_page))
    dispatch(requestData())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DATA]: (state) => {
    return ({...state, fetching: true})
  },
  [RECEIVE_DATA]: (state, action) => {
    const count = action.payload.count ? action.payload.count : state.count
    const incomes = action.payload.incomes ? action.payload.incomes : state.incomes
    const has_partner = action.payload.has_partner ? action.payload.has_partner : state.has_partner
    return ({...state, fetching: false, list: action.payload.items, incomes, count, total_count: action.payload.total_count, has_partner})
  },
  [PAGE_CHANGE]: (state, action) => {
    return ({...state, page: action.payload.page, per_page: action.payload.per_page})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  list: null,
  total_count: 0,
  page: 1,
  per_page: 10
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
