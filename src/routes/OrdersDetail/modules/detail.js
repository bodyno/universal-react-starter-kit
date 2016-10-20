//--------------------------------------
// Constants
//--------------------------------------
const SET_SHOWEDITREMARK = "SET_SHOWEDITREMARK"
const SET_SHOWEDITINFO = "SET_SHOWEDITiNFO"
const SET_ORDERSTATUS = "SET_ORDERSTATUS"

//-----------------------------------------
// Actions
//-----------------------------------------

export function setShowEditRemark (data) {
  return {
    type: SET_SHOWEDITREMARK,
    preload: data
  }
}

export function setShowEditInfo (data) {
  return {
    type: SET_SHOWEDITINFO,
    preload: data
  }
}

export function setOrderStatus (data) {

}

//------------------------------------------
// Action Handlers
//------------------------------------------
const ACTION_HANDLERS = {
  [SET_SHOWEDITREMARK]: (state, action) => {
    return ({...state, showEditRemark: action.preload})
  },
  [SET_SHOWEDITINFO]: (state, action) => {
    return ({...state, showEditInfo: action.preload})
  }
}

//---------------------------------------------
// Reducer
//---------------------------------------------
const initialState = {
  showEditRemark: false,
  showEditInfo: false
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
