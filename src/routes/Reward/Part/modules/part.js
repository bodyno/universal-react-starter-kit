import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_PART'
const RECEIVE_DATA = 'RECEIVE_DATA_PART'
const PAGE_CHANGE = 'PAGE_CHANGE_PART'
const DATA_CHANGE = 'DATA_CHANGE_PART'
const DATE_CHANGE = 'DATE_CHANGE_PART'
const SORT_CHANGE = 'SORT_CHANGE_PART'

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
    const state = getState().part
    ajax.get('/commissions', {
      params: {
        page: state.page,
        per_page: state.per_page,
        begin_time: state.begin_time,
        end_time: state.end_time,
        latest_day: state.latest_day,
        q: state.q,
        sort: state.sort,
        orderby: state.orderby
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
function dataChangeHandle (type, data) {
  return {
    type: DATA_CHANGE,
    payload: {
      type,
      data
    }
  }
}

function dateChangeHandle (begin, end) {
  return {
    type: DATE_CHANGE,
    payload: {
      begin,
      end
    }
  }
}

export function dateChange (begin, end) {
  return (dispatch, getState) => {
    dispatch(dateChangeHandle(begin, end))
    dispatch(requestData())
  }
}

export function dataChange (type, data) {
  return (dispatch, getState) => {
    dispatch(dataChangeHandle(type, data))
    dispatch(requestData())
  }
}

export function changePage (page, per_page) {
  return (dispatch, getState) => {
    if (!per_page) per_page = getState().part.per_page
    dispatch(changePageHandle(page, per_page))
    dispatch(requestData())
  }
}

function sortChangeHandle (sort, orderby) {
  return {
    type: SORT_CHANGE,
    payload: {
      sort,
      orderby
    }
  }
}

export function sortChange (sort, orderby) {
  return (dispatch, getState) => {
    dispatch(sortChangeHandle(sort, orderby))
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
  },
  [DATE_CHANGE]: (state, action) => {
    return ({...state, begin_time: action.payload.begin, end_time: action.payload.end})
  },
  [DATA_CHANGE]: (state, action) => {
    let data = {}
    data[action.payload.type] = action.payload.data
    return ({...state, ...data})
  },
  [SORT_CHANGE]: (state, action) => {
    return ({...state, sort: action.payload.sort, orderby: action.payload.orderby})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  list: null,
  incomes: null,
  count: null,
  total_count: 0,
  begin_time: null,
  end_time: null,
  latest_day: null,
  q: null,
  page: 1,
  per_page: 10,
  sort: null,
  orderby: null,
  has_partner: false
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
