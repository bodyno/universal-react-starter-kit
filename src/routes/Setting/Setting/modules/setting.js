import ajax from 'components/Ajax'

//--------------------------------------
// Constants
//--------------------------------------

const SET_SHOWEDITNAME = "SET_SHOWEDITNAME"
const SET_SHOWEDITLOGO = "SET_SHOWEDITLOGO"
const SET_SHOWEDITQRSTORE = "SET_SHOWEDITQRSTORE"
const SET_SHOWEDITSIGNS = "SET_SHOWEDITSIGNS"
const SET_SHOWEDITINTRO = "SET_SHOWEDITINTRO"
const SET_SHOWEDITPHONE = "SET_SHOWEDITPHONE"
const SET_SHOWEDITPUBLIC = "SET_SHOWEDITPUBLIC"
const SET_SHOWEDITQROWN = "SET_SHOWEDITQROWN"
const SET_SHOWEDITQQ = "SET_SHOWEDITQQ"
const RECIEVE_SETTINGDATA = "RECIEVE_SETTINGDATA"
const EDIT_SETTINGDATA = "EDIT_SETTINGDATA"
const UPLOAD_IMAGE = "UPLOAD_IMAGE"
const EDIT_SHOWREADING = "EDIT_SHOWREADING"
const EDIT_SHOWNEWBOOK = "EDIT_SHOWNEWBOOK"
const CREATE_QRCODE = "CREATE_QRCODE"
const REQUEST_QRCODE = "REQUEST_QRCODE"

//-----------------------------------------
// Actions
//-----------------------------------------

export function setShowEditName (data) {
  return {
    type: SET_SHOWEDITNAME,
    preload: data
  }
}

export function setShowEditLogo (data) {
  return {
    type: SET_SHOWEDITLOGO,
    preload: data
  }
}

export function setShowEditQRStore (data) {
  return {
    type: SET_SHOWEDITQRSTORE,
    preload: data
  }
}

export function setShowEditSigns (data) {
  return {
    type: SET_SHOWEDITSIGNS,
    preload: data
  }
}

export function setShowEditIntro (data) {
  return {
    type: SET_SHOWEDITINTRO,
    preload: data
  }
}

export function setShowEditPhone (data) {
  return {
    type: SET_SHOWEDITPHONE,
    preload: data
  }
}

export function setShowEditPublic (data) {
  return {
    type: SET_SHOWEDITPUBLIC,
    preload: data
  }
}

export function setShowEditQROwn (data) {
  return {
    type: SET_SHOWEDITQROWN,
    preload: data
  }
}

export function setShowEditQQ (data) {
  return {
    type: SET_SHOWEDITQQ,
    preload: data
  }
}

export function receiveSettingData (data) {
  return {
    type: RECIEVE_SETTINGDATA,
    preload: data
  }
}

export function requestSettingData (data) {
  return (dispatch, getState) => {
    ajax.get('/user/store').then(({data}) => {
      dispatch(receiveSettingData(data))
    })
  }
}

export function editSettinData (data) {
  return {
    type: EDIT_SETTINGDATA,
    payload: data
  }
}

export function putSettingData (data, type) {
  return (dispatch, getState) => {

    const ajaxData = {}
    ajaxData[type] = data

    ajax.put('/user/store', ajaxData).then(({data}) => {

      dispatch(editSettinData(data))

    })
  }
}

export function uploadImage (data) {
  return {
    type: UPLOAD_IMAGE,
    payload: data
  }
}

export function uploadImageChange (data, type) {
  return (dispatch, getState) => {
    ajax({
      method: 'post',
      baseURL: '/restapi/account/v1/',
      url: '/users/imageupload',
      data: data
    }).then(({data}) => {
      let payload = getState().setting.data

      payload[type] = data.avatar
      dispatch(uploadImage(payload))
      dispatch(putSettingData(payload[type], type))
    })
  }
}

export function createQrcode (data) {
  return {
    type: CREATE_QRCODE,
    payload: data
  }
}

export function requestQrcode (data, type) {
  return (dispatch, getState) => {
    ajax({
      method: 'get',
      baseURL: '/restapi/open/misc/',
      url: '/qrcode',
      params:{
        data: data
      }
    }).then(({data}) => {
      let payload = getState().setting.data

      payload[type] = data.qrcode
      dispatch(createQrcode(payload))
      dispatch(putSettingData(payload[type], type))
    })
  }
}

export function requestStoreQrcode (data) {
  return {
    type: REQUEST_QRCODE,
    payload: data
  }
}

export function requestQrStore () {
  return (dispatch, getState) => {
    const store_id = getState().core.store_info.store_id

    ajax({
      method: 'get',
      baseURL: '/restapi/open/misc/',
      url: `/store/${store_id}/qrcode`,
      params:{
        type: 'creat',
        size: '0',
      }
    }).then(({data}) => {
      dispatch(requestStoreQrcode(data))
    })
  }
}

//------------------------------------------
// Action Handlers
//------------------------------------------

const ACTION_HANDLERS = {
  [SET_SHOWEDITNAME]: (state, action) => {
    return ({...state, showEditName: action.preload})
  },
  [SET_SHOWEDITLOGO]: (state, action) => {
    return ({...state, showEditLogo: action.preload})
  },
  [SET_SHOWEDITQRSTORE]: (state, action) => {
    return ({...state, showEditQRStore: action.preload})
  },
  [SET_SHOWEDITSIGNS]: (state, action) => {
    return ({...state, showEditSigns: action.preload})
  },
  [SET_SHOWEDITINTRO]: (state, action) => {
    return ({...state, showEditIntro: action.preload})
  },
  [SET_SHOWEDITPHONE]: (state, action) => {
    return ({...state, showEditPhone: action.preload})
  },
  [SET_SHOWEDITPUBLIC]: (state, action) => {
    return ({...state, showEditPublic: action.preload})
  },
  [SET_SHOWEDITQROWN]: (state, action) => {
    return ({...state, showEditQROwn: action.preload})
  },
  [SET_SHOWEDITQQ]: (state, action) => {
    return ({...state, showEditQQ: action.preload})
  },
  [RECIEVE_SETTINGDATA]: (state, action) => {
    return ({...state, data: action.preload})
  },
  [EDIT_SETTINGDATA]: (state, action) => {
    return ({
      ...state, data: action.payload,
      showEditName: false,
      showEditIntro: false,
      showEditPhone: false,
      showEditQQ: false
    })
  },
  [UPLOAD_IMAGE]: (state, action) => {
    return ({...state, data: action.payload})
  },
  [CREATE_QRCODE]: (state, action) => {
    return ({...state, data: action.payload})
  },
  [REQUEST_QRCODE]: (state, action) => {
    return ({...state, qrStore: action.payload})
  }
}

//---------------------------------------------
// Reducer
//---------------------------------------------

const initialState = {
  showEditName: false,
  showEditLogo: false,
  showEditQRStore: false,
  showEditSigns: false,
  showEditIntro: false,
  showEditPhone: false,
  showEditPublic: false,
  showEditQROwn: false,
  showEditQQ: false,
  data: null,
  qrStore: ''
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
