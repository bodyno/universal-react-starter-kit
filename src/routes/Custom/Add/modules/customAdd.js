import ajax from 'components/Ajax'
import array from 'lodash/array'
import collection from 'lodash/collection'
// ------------------------------------
// Constants
// ------------------------------------
const SET_IMAGE_LIST = 'SET_IMAGE_LIST_CUSTOM'
const SET_PREVIEW = 'SET_PREVIEW_CUSTOM'
const SET_SHOWBOOKS = 'SET_SHOWBOOKS_CUSTOM'
const SET_SHOWADDBOOKS = 'SET_SHOWADDBOOKS_CUSTOM'
const SET_SELECT_IMAGE = 'SET_SELECT_IMAGE_CUSTOM'
const SET_TITLE = 'SET_TITLE_CUSTOM'
const SET_TITLE_ERROR = 'SET_TITLE_ERROR_CUSTOM'
const SET_SUB_TITLE = 'SET_SUB_TITLE_CUSTOM'
const SET_SUB_TITLE_ERROR = 'SET_SUB_TITLE_ERROR_CUSTOM'
const SET_DESC = 'SET_DESC_CUSTOM'
const SET_SHOW_SUB_TITLE = 'SET_SHOW_SUB_TITLE_CUSTOM'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE_CUSTOM'
const ADD_SUB_BOOK = 'ADD_SUB_BOOK_CUSTOM'
const SAVE_LIST = 'SAVE_LIST_CUSTOM'
const ADD_NEW_DIR = 'ADD_NEW_DIR_CUSTOM'
const CHANGE_DIR_INDEX = 'CHANGE_DIR_INDEX_CUSTOM'
const DELETE_BOOK = 'DELETE_BOOK_CUSTOM'
const SORT_BOOK = 'SORT_BOOK_CUSTOM'
const DELETE_DIR = 'DELETE_DIR_CUSTOM'
const SORT_DIR = 'SORT_DIR_CUSTOM'
const DELETE_IMAGE = 'DELETE_IMAGE_CUSTOM'
const INIT_DATA = 'INIT_DATA_CUSTOM'
const SET_ID = 'SET_ID_CUSTOM'

// ------------------------------------
// Actions
// ------------------------------------

function uploadImageHandle (id) {
  return {
    type: UPLOAD_IMAGE,
    payload: id
  }
}

export function deleteDir (index) {
  return {
    type: DELETE_DIR,
    payload: index
  }
}

function deleteImgHandle (id) {
  return {
    type: DELETE_IMAGE,
    payload: id
  }
}

function initDataHandle (data) {
  return {
    type: INIT_DATA,
    payload: data
  }
}

function setId (id) {
  return {
    type: SET_ID,
    payload: id
  }
}

export function initData(id) {
  return (dispatch, getState) => {
    if (id) {
      dispatch(setId(id))
      ajax.get(`/booklists/${id}`).then(({data}) => {
        dispatch(initDataHandle({
          desc: data.brief,
          title: data.name,
          selectImage: {
            id: data.template_id,
            path: data.pic
          },
          submenu: data.submenu,
          fetchComplete: true
        }))
      })
    } else {
      dispatch(initDataHandle(initialState))
    }
  }
}

export function deleteImg(id) {
  return (dispatch, getState) => {
    ajax.delete(`/booklists/templates/${id}`)
    dispatch(deleteImgHandle(id))
  }
}

export function sortDir (index, id, direction) {
  return {
    type: SORT_DIR,
    payload: {
      index, id, direction
    }
  }
}

function saveListHandle () {
  return {
    type: SAVE_LIST
  }
}

function sortBookHandle (data) {
  return {
    type: SORT_BOOK,
    payload: data
  }
}

export function sortBook (arr) {
  return (dispatch, getState) => {
    const index = array.findIndex(getState().customAdd.submenu, {id: getState().customAdd.selectDirIndex})
    const submenu = getState().customAdd.submenu[index]
    let newArr = []
    collection.map(arr, (item) => {
      newArr.push(collection.find(submenu.subBooks, {goods_id: item}))
    })
    dispatch(sortBookHandle([]))
    dispatch(sortBookHandle(newArr))
  }
}

export function saveList () {
  return (dispatch, getState) => {
    const state = getState().customAdd
    const submenu = collection.map(state.submenu, (item) => {
      let data = {
        subTitle: item.subTitle,
        subBooks: collection.map(item.subBooks, (item) => item.goods_id),
        showSubTitle: item.showSubTitle
      }
      if (item.id) data.id = item.id
      return data
    })
    let data = {
      name: state.title,
      brief: state.desc,
      pic: state.selectImage.path,
      template_id: state.selectImage.id,
      submenu: submenu
    }
    if (state.id) {
      ajax.put(`/booklists/${state.id}`, data).then(({data}) => {
        dispatch(saveListHandle())
      })
    } else {
      ajax.post('/booklists', data).then(({data}) => {
        dispatch(saveListHandle())
      })
    }
  }
}

export function uploadImage (formData) {
  return (dispatch, getState) => {
    ajax.post('/booklists/templates/imageupload', formData).then(({data}) => {
      dispatch(uploadImageHandle(data))
    })
  }
}

export function setSelectImage (id) {
  return {
    type: SET_SELECT_IMAGE,
    payload: id
  }
}

export function setTitle (title) {
  return {
    type: SET_TITLE,
    payload: title
  }
}

export function setSubTitle (title) {
  return {
    type: SET_SUB_TITLE,
    payload: title
  }
}

export function setDesc (desc) {
  return {
    type: SET_DESC,
    payload: desc
  }
}

export function setTitleError (flag) {
  return {
    type: SET_TITLE_ERROR,
    payload: flag
  }
}

export function setShowSubTitle (flag) {
  return {
    type: SET_SHOW_SUB_TITLE,
    payload: flag
  }
}

export function setSubTitleError (flag) {
  return {
    type: SET_SUB_TITLE_ERROR,
    payload: flag
  }
}

function setImageList (data) {
  return {
    type: SET_IMAGE_LIST,
    payload: data
  }
}

export function setPreview (flag) {
  return {
    type: SET_PREVIEW,
    payload: flag
  }
}

export function setShowBooks (flag) {
  return {
    type: SET_SHOWBOOKS,
    payload: flag
  }
}

export function setShowAddBooks (flag) {
  return {
    type: SET_SHOWADDBOOKS,
    payload: flag
  }
}

export function addNewDir () {
  return {
    type: ADD_NEW_DIR
  }
}

export function deleteBook (id) {
  return {
    type: DELETE_BOOK,
    payload: id
  }
}

export function getImageList () {
  return (dispatch, getState) => {
    if (getState().custom) {
      dispatch(setImageList(getState().custom.images))
    } else {
      ajax.get('/booklists').then(({data}) => {
        dispatch(setImageList(data.images))
      })
    }
  }
}

export function addSubBook (data) {
  return {
    type: ADD_SUB_BOOK,
    payload: data
  }
}

export function changeDirIndex (index) {
  return {
    type: CHANGE_DIR_INDEX,
    payload: index
  }
}

let id = 0

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PREVIEW]: (state, action) => {
    return ({...state, preview: action.payload})
  },
  [SET_SHOWBOOKS]: (state, action) => {
    return ({...state, showBooks: action.payload})
  },
  [SET_SHOWADDBOOKS]: (state, action) => {
    return ({...state, showAddBooks: action.payload})
  },
  [SET_IMAGE_LIST]: (state, action) => {
    let selectImage = state.selectImage
    if (!state.id) selectImage = action.payload[0]
    return ({...state, imageList: action.payload, selectImage})
  },
  [SET_SELECT_IMAGE]: (state, action) => {
    const data = collection.find(state.imageList, {id: action.payload})
    return ({...state, selectImage: data})
  },
  [SET_TITLE]: (state, action) => {
    return ({...state, title: action.payload})
  },
  [SET_TITLE_ERROR]: (state, action) => {
    return ({...state, showTitleError: action.payload})
  },
  [SET_SUB_TITLE]: (state, action) => {
    const index = array.findIndex(state.submenu, {id: state.selectDirIndex})
    const newArr = {...state.submenu[index], subTitle: action.payload}
    return ({...state, submenu: [...state.submenu.slice(0,index), newArr, ...state.submenu.slice(index + 1)]})
  },
  [SET_SUB_TITLE_ERROR]: (state, action) => {
    return ({...state, showSubTitleError: action.payload})
  },
  [SET_DESC]: (state, action) => {
    return ({...state, desc: action.payload})
  },
  [UPLOAD_IMAGE]: (state, action) => {
    return ({...state, imageList: state.imageList.concat(action.payload)})
  },
  [SET_SHOW_SUB_TITLE]: (state, action) => {
    const index = array.findIndex(state.submenu, {id: state.selectDirIndex})
    const newArr = {...state.submenu[index], showSubTitle: action.payload}
    return ({...state, submenu: [...state.submenu.slice(0, index), newArr, ...state.submenu.slice(index + 1)]})
  },
  [ADD_SUB_BOOK]: (state, action) => {
    const index = array.findIndex(state.submenu, {id: state.selectDirIndex})
    const findArr = state.submenu[index]
    const newArr = {...findArr, subBooks: array.uniqBy(findArr.subBooks.concat(action.payload), 'goods_id')}
    return ({...state, submenu: [...state.submenu.slice(0,index), newArr, ...state.submenu.slice(index + 1)]})
  },
  [ADD_NEW_DIR]: (state, action) => {
    return ({...state, submenu: [{
      id: ++id,
      subTitle: '',
      showSubTitle: true,
      subBooks: []
    }].concat(state.submenu),
      selectDirIndex: id
    })
  },
  [SAVE_LIST]: (state, action) => {
    return ({...state, subBooks: [], submenu: [], subTitle: '', showSubTitle: true})
  },
  [CHANGE_DIR_INDEX]: (state, action) => {
    const result = collection.find(state.submenu, {id: action.payload})
    return ({...state, selectDirIndex: action.payload, subTitle: result.subTitle, showSubTitle: result.showSubTitle, subBooks: result.subBooks})
  },
  [DELETE_BOOK]: (state, action) => {
    const index = array.findIndex(state.submenu, {id: state.selectDirIndex})
    const findArr = state.submenu[index]
    const resultIndex = array.findIndex(findArr.subBooks, {goods_id: action.payload})
    const newArr = [...findArr.subBooks.slice(0, resultIndex), ...findArr.subBooks.slice(resultIndex + 1)]
    return ({...state, submenu: [...state.submenu.slice(0,index), {...findArr, subBooks: newArr}, ...state.submenu.slice(index + 1)]})
  },
  [SORT_BOOK]: (state, action) => {
    const index = array.findIndex(state.submenu, {id: state.selectDirIndex})
    const submenu = state.submenu[index]
    return ({...state, submenu: [...state.submenu.slice(0,index), {...submenu, subBooks: action.payload}, ...state.submenu.slice(index + 1)]})
  },
  [DELETE_DIR]: (state, action) => {
    let showAddBooks = false
    let selectDirIndex
    const newArr = [...state.submenu.slice(0,action.payload), ...state.submenu.slice(action.payload + 1)]
    if (newArr.length) showAddBooks = true
    if (newArr.length) {
       selectDirIndex = newArr[0].id
    } else {
      selectDirIndex = 0
    }
    return ({...state, submenu: newArr, showAddBooks, selectDirIndex})
  },
  [SORT_DIR]: (state, action) => {
    let submenu = state.submenu.slice(0)
    const index = array.findIndex(submenu, {id: action.payload.id})
    let resultIndex
    if (action.payload.direction == 'up') {
      resultIndex = index - 1
    } else {
      resultIndex = index + 1
    }
    const target = submenu[index]
    submenu[index] = submenu[resultIndex]
    submenu[resultIndex] = target
    return ({...state, submenu: submenu})
  },
  [DELETE_IMAGE]: (state, action) => {
    const index = array.findIndex(state.imageList, {id: action.payload})
    return ({...state, imageList: [...state.imageList.slice(0,index), ...state.imageList.slice(index + 1)]})
  },
  [INIT_DATA]: (state, action) => {
    const data = action.payload
    return ({...state, ...action.payload})
  },
  [SET_ID]: (state, action) => {
    return ({...state, id: action.payload})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  id: null,
  fetchComplete: false,
  preview: false,
  showBooks: false,
  showAddBooks: false,
  imageList: [],
  title: '',
  desc: '',
  selectImage: null,
  showTitleError: false,
  submenu: [],
  showSubTitleError: false,
  selectDirIndex: 0
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
