import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const CHANGE_TYPE = 'CHANGE_TYPE'
const REQUEST_DATA = 'REQUEST_DATA'
const RECEIVE_DATA = 'RECEIVE_DATA'
const RECEIVE_PAGE = 'RECEIVE_PAGE_ALL'
const SET_SHOWTOOLTIPS = 'SET_SHOWTOOLTIPS'

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

export function fetchAllData () {
  return (dispatch, getState) => {
    dispatch(requestDate())

    const param = getState().order

    ajax.get('/orders', {
      params: {
        q: param.q,
        page: param.page,
        per_page: param.per_page,
        begin_time: param.begin_time,
        end_time: param.end_time,
        order_status: param.order_status,
        user_id: param.user_id,
        goods_id: param.goods_id,
      }
    }).then(({data}) => {
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

    const per_page = pageSize != undefined ? pageSize : getState().bookList.per_page

    dispatch(receivePage(page,per_page))

    dispatch(fetchAllBooks())

  }
}

export function showToolTips (data) {
  return {
    type: SET_SHOWTOOLTIPS,
    preload: data
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
    return ({...state, isFetching:false, list: action.payload.items, total_count: action.payload.total_count})
  },
  [RECEIVE_PAGE]: (state, action) =>{
    return ({
      ...state,
      page: action.payload.page,
      per_page: action.payload.pageSize
    })
  },
  [SET_SHOWTOOLTIPS]: (state, action) => {
    return ({...state, toolTips: action.preload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  type: 'all',
  isFetching: false,
  toolTips: false,
  list: null,
  total_count: 0,
  q: null,
  page: 1,
  per_page: 10,
  order_status: '',
  begin_time: '',
  end_time: '',
  user_id: '',
  goods_id: '',
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
