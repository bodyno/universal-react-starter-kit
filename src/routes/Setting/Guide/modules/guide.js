import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const SET_SHOWVIDEO = "SET_SHOWVIDEO"
const RECIEVE_GUIDEDATA = "RECIEVE_GUIDEDATA"

// ------------------------------------
// Actions
// ------------------------------------
export function setShowVideo (data) {
  return {
    type: SET_SHOWVIDEO,
    preload: data
  }
}

export function receiveGuideData (data) {
  return {
    type: RECIEVE_GUIDEDATA,
    preload: data
  }
}

export function requestGuideData (data) {
  return (dispatch, getState) => {
    ajax.get('/instructions').then(({data}) => {
      dispatch(receiveGuideData(data))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDALES = {
  [SET_SHOWVIDEO]: (state, action) => {
    return ({
      ...state,
      showVideo: action.preload
    })
  },
  [RECIEVE_GUIDEDATA]: (state, action) => {
    return ({
      ...state,
      data: action.preload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showVideo: false,
  data: null
}

export default function ( state = initialState,  action) {
  const handler = ACTION_HANDALES[action.type]

  return handler ? handler( state, action ) : state
}
