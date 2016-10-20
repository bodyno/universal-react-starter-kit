import ajax from 'components/Ajax'
// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_FAMILY'
const RECEIVE_DATA = 'RECEIVE_DATA_FAMILY'
const RECEIVE_PAGE = 'RECEIVE_PAGE_FAMILY'
const RECEIVE_SEARCH = 'RECEIVE_SEARCH_FAMILY'
const RECEIVE_TIME = 'RECEIVE_TIME_FAMILY'

// ------------------------------------
// Actions
// ------------------------------------

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

    dispatch(requestDate())

    const param = getState().family

    ajax.get(`/members`,{
      params: {
        page: param.page,
        per_page: param.per_page,
        begin_time: param.begin_time,
        end_time: param.end_time,
        q: param.q
      }
    })
      .then(({data}) => {
        dispatch(receiveData(data))
      })
  }
}

function receivePage(page,pageSize) {
  return {
    type: RECEIVE_PAGE,
    payload: {
      page: page,
      pageSize: pageSize
    }
  }
}

export function changePage(page ,pageSize) {
  return (dispatch, getState) => {

    const per_page = pageSize != undefined ? pageSize : getState().generalize.per_page

    dispatch(receivePage(page,per_page))

    dispatch(fetchData())

  }
}

function receiveSearch(q) {
  return {
    type: RECEIVE_SEARCH,
    payload: q
  }
}

export function changeSearch(q) {
  return (dispatch, getState) => {
    dispatch(receiveSearch(q))
    dispatch(fetchData())
  }
}

function receiveTime(time) {
  return {
    type: RECEIVE_TIME,
    payload: time
  }
}

export function changeTime(time) {
  return (dispatch, getState) => {

    dispatch(receiveTime(time))

    dispatch(fetchData())

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
    return ({...state, isFetching: false, items: action.payload.items, total_count: action.payload.total_count})
  },
  [RECEIVE_PAGE]: (state, action) =>{
    return ({
      ...state,
      page: action.payload.page,
      per_page: action.payload.pageSize
    })
  },
  [RECEIVE_SEARCH]: (state, action) =>{
    return ({
      ...state,
      q: action.payload
    })
  },
  [RECEIVE_TIME]: (state, action) =>{
    return ({
      ...state,
      begin_time: action.payload.begin_time,
      end_time: action.payload.end_time
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  type: 'family',
  isFetching: false,
  items: null,
  total_count: 0,
  q: null,
  page: 1,
  per_page: 10,
  begin_time: '',
  end_time: ''
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
