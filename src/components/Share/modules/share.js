import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const SET_SHOWSHARE = 'SET_SHOWSHARE'
const SET_SHOWMORE = 'SET_SHOWMORE'
const SHOW_SHARE = 'SHOW_SHARE'

// ------------------------------------
// Actions
// ------------------------------------

export function setShowShare (data) {
  return {
    type: SET_SHOWSHARE,
    payload: data
  }
}

export function setShowMore (data) {
  return {
    type: SET_SHOWMORE,
    payload: data
  }
}

export function showShare (flag, url, title, custom) {
  return {
    type: SHOW_SHARE,
    payload: {
      flag,
      url,
      title,
      custom
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SHOWSHARE]: (state, action) => {
    return ({...state, showShare: action.payload, custom: false})
  },
  [SET_SHOWMORE]: (state, action) => {
    return ({...state, showShare: false, showMore: action.payload})
  },
  [SHOW_SHARE]: (state, action) => {
    return ({...state, showShare: action.payload.flag, custom: action.payload.custom, url: action.payload.url, title: action.payload.title})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showShare: false,
  showMore: false,
  url: null,
  title: null,
  custom: null
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
