import ajax from 'components/Ajax'
import array from 'lodash/array'
import collection from 'lodash/collection'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_CUSTOM'
const RECEIVE_DATA = 'RECEIVE_DATA_CUSTOM'
const CHANGE_SHOWSYS = 'CHANGE_SHOWSYS_CUSTOM'
const DELETE_BOOKS = 'DELETE_BOOKS_CUSTOM'
const FIRST_PAGE = 'FIRST_PAGE_CUSTOM'
const COPY_BOOKS = 'COPY_BOOKS_CUSTOM'

// ------------------------------------
// Actions
// ------------------------------------

function copyBooksHandle (data) {
  return {
    type: COPY_BOOKS,
    payload: data
  }
}

export function copyBooks (id) {
  return (dispatch, getState) => {
    ajax.post(`/booklists/${id}/copy`).then(({data}) => {
      dispatch(copyBooksHandle(data))
    })
  }
}

function firstPageHandle (id) {
  return {
    type: FIRST_PAGE,
    payload: id
  }
}

export function firstPage (id, flag, is_sys) {
  return (dispatch, getState) => {
    dispatch(firstPageHandle(id))
    ajax.put(`/booklists/${id}`, {
      is_show: flag,
      is_sys: is_sys
    })
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

function deleteBooksHandle (id) {
  return {
    type: DELETE_BOOKS,
    payload: id
  }
}

export function deleteBooks (id) {
  return (dispatch) => {
    dispatch(deleteBooksHandle(id))
    ajax.delete(`/booklists/${id}`)
  }
}

export function changeShowSys (value) {
  return (dispatch, getState) => {
    dispatch(changeShowSysHandle(value))
    ajax.put('/user/store', {
      show_sys_booklist: value
    })
  }
}

export function changeShowSysHandle (value) {
  return {
    type: CHANGE_SHOWSYS,
    payload: value
  }
}

export function fetchData () {
  return (dispatch, getState) => {
    if (getState().custom.isFetching) return

    dispatch(requestDate())
    ajax.get('/booklists').then(({data}) => {
      dispatch(changeShowSysHandle(data.show_sys_booklist))
      dispatch(receiveData(data))
    })

  }
}

export function sort (src, dist) {
  return (dispatch, getState) => {
    ajax.put(`/booklists/${dist}/number/replacement_source/${src}`).then(({data}) => {
      const origin = getState().custom.list
      let newArr = []
      for (var i = 0; i < data.length; i++) {
        newArr.push(collection.find(origin, {'sortId': data[i]}))
      }
      dispatch(receiveData([]))
      dispatch(receiveData(newArr))
    })
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
    return ({...state, isFetching:false, list: action.payload.data, images: action.payload.images})
  },
  [CHANGE_SHOWSYS]: (state, action) => {
    return ({...state, showSys: action.payload})
  },
  [DELETE_BOOKS]: (state, action) => {
    const index = array.findIndex(state.list, {id: action.payload})
    return ({...state, list: [...state.list.slice(0, index), ...state.list.slice(index + 1)] })
  },
  [FIRST_PAGE]: (state, action) => {
    const index = array.findIndex(state.list, {id: action.payload})
    const newData = {...state.list[index], is_show: !state.list[index].is_show}
    return ({...state, list: [...state.list.slice(0, index), newData, ...state.list.slice(index + 1)] })
  },
  [COPY_BOOKS]: (state, action) => {
    return ({...state, list: state.list.concat(action.payload)})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  list: [],
  images: [],
  showSys: true
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
