import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------

const SET_PREVIEWIMAGE = "SET_PREVIEWIMAGE"
const UPLOAD_IMAGE = "UPLOAD_IMAGE"
const DELETE_IMAGE = "DELETE_IMAGE"
const SET_FEEDBACK = "SET_FEEDBACK"

// ------------------------------------
// Actions
// ------------------------------------

export function setPreviewImage (visible, index) {
  return {
    type: SET_PREVIEWIMAGE,
    preload: {
      visible,
      index,
    }
  }
}

export function uploadImage (data) {
  return {
    type: UPLOAD_IMAGE,
    payload: data
  }
}

export function uploadImageChange (data) {
  return (dispatch, getState) => {
    ajax({
      method: 'post',
      baseURL: '/restapi/account/v1/',
      url: '/users/imageupload',
      data: data
    }).then(({data}) => {
      dispatch(uploadImage(data.avatar))
    })
  }
}

export function deleteImageChange (index) {
  return {
    type: DELETE_IMAGE,
    payload: index
  }
}


export function setFeedback () {
  return {
    type: SET_FEEDBACK,
  }
}

export function postFeedback (con, img) {
  return (dispatch, getState) => {
    let payload = getState().feedback.data

    ajax({
      method: 'post',
      baseURL: '/restapi/account/v1/',
      url: '/user/feedback',
      data: {
        content: con,
        img: payload
      }
    }).then(({data}) => {
      dispatch(setFeedback())
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PREVIEWIMAGE]: ( state, action ) =>({
    ...state,
    visible: action.preload.visible,
    bigImageIndex: action.preload.index,
  }),
  [UPLOAD_IMAGE]: (state, action) => {
    return ({...state, data: state.data.concat(action.payload)})
  },
  [DELETE_IMAGE]: (state, action) => {
    return ({...state, data: [...state.data.slice(0, action.payload), ...state.data.slice(action.payload + 1)]})
  },
  [SET_FEEDBACK]: (state, action) => ({
    ...state,
    data: []
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  bigImageIndex: 0,
  visible: false,
  data: []
}

export default function ( state = initialState, action ) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler( state, action ) : state
}
