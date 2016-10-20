import ajax from 'components/Ajax'
import { ageMap } from 'components/Common'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_NEWBOOKS'
const RECEIVE_DATA = 'RECEIVE_DATA_NEWBOOKS'
const CHECK_CHANGE = 'CHECK_CHANGE_NEWBOOKS'
const RECEIVE_PAGE = 'RECEIVE_PAGE_NEWBOOKS'
const RECEIVE_SEARCH = 'RECEIVE_SEARCH_NEWBOOKS'
const CHANGE_PERPAGE = 'CHANGE_PERPAGE_ALLBOOKS'
const SORT_CHANGE = 'SORT_CHANGE_ALLBOOKS'

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

export function fetchNewBooks () {
  return (dispatch, getState) => {

    dispatch(requestDate())

    const param = getState().booksNew

    const age = ageMap(param.ageCheckValue, param.ageOptions)

    ajax.get(`/goods/new`,{
      params: {
        q: param.q,
        page: param.page,
        per_page: param.per_page,
        age: age,
        sort: param.sort,
        orderby: param.orderby
      }
    })
      .then(({data}) => {
        dispatch(receiveData(data))
      })
  }
}

function checkChangeHandle (data) {
  return {
    type: CHECK_CHANGE,
    payload: data
  }
}

export function checkChange (data) {
  return (dispatch, getState) => {

    dispatch(checkChangeHandle(data))

    dispatch(fetchNewBooks())
  }
}

function receivePage(page, pageSize) {
  return {
    type: RECEIVE_PAGE,
    payload: {
      page,
      pageSize
    }
  }
}

export function changePage(page ,pageSize) {
  return (dispatch, getState) => {

    const per_page = pageSize != undefined ? pageSize : getState().booksNew.per_page

    dispatch(receivePage(page, per_page))

    dispatch(fetchNewBooks())
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

    dispatch(fetchNewBooks())

  }
}

export function changePerPage (page) {
  return {
    type: CHANGE_PERPAGE,
    payload: page
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
    dispatch(fetchNewBooks())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DATA]: (state) => {
    return ({...state, isFetching:true})
  },
  [RECEIVE_DATA]: (state, action) => {
    return ({...state, isFetching: false, items: action.payload.items, total_count: action.payload.total_count})
  },
  [CHECK_CHANGE]: (state, action) =>{
    return ({
      ...state,
      ageCheckAll: action.payload.ageCheckAll,
      ageCheckValue: action.payload.ageCheckValue
    })
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
  [CHANGE_PERPAGE]: (state, action) =>{
    return ({...state, per_page: action.payload, page: 1, items: null})
  },
  [SORT_CHANGE]: (state, action) => {
    return ({...state, sort: action.payload.sort, orderby: action.payload.orderby})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  type: 'new',
  isFetching: false,
  items: [],
  total_count: 0,
  ageCheckAll: true,
  ageOptions: ['0-3岁', '3-5岁', '7-9岁', '9-12岁', '12岁以上'],
  ageCheckValue: ['0-3岁', '3-5岁', '7-9岁', '9-12岁', '12岁以上'],
  q: null,
  page: 1,
  per_page: 10,
  sort: null,
  orderby: null
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
