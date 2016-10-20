import ajax from 'components/Ajax'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DATA = 'REQUEST_DATA_WITHDRAW'
const RECEIVE_DATA = 'RECEIVE_DATA_WITHDRAW'
const PAGE_CHANGE = 'PAGE_CHANGE_WITHDRAW'
const DATA_CHANGE = 'DATA_CHANGE_WITHDRAW'
const DATE_CHANGE = 'DATE_CHANGE_WITHDRAW'
const CHANGE_MASK = 'CHANGE_MASK_WITHDRAW'
const SET_APPLY_DATA = 'SET_APPLY_DATA_WITHDRAW'
const VALUE_CHANGE = 'VALUE_CHANGE_WITHDRAW'

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
    const state = getState().withdraw
    ajax.get('/withdrawals', {
      params: {
        begin_time: state.begin_time,
        end_time: state.end_time,
        status: state.status,
        page: state.page,
        per_page: state.per_page
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

export function changePage (page, per_page) {
  return (dispatch, getState) => {
    if (!per_page) per_page = getState().withdraw.per_page
    dispatch(changePageHandle(page, per_page))
    dispatch(requestData())
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

export function changeMaskHandle (value) {
  return {
    type: CHANGE_MASK,
    payload: value
  }
}

function setApplyData (value) {
  return {
    type: SET_APPLY_DATA,
    payload: value
  }
}

export function valueChange (type, value) {
  return {
    type: VALUE_CHANGE,
    payload: {
      type,
      value
    }
  }
}

export function getApply () {
  return (dispatch, getState) => {
    ajax.get('/user/payment_account').then(({data}) => {
      dispatch(setApplyData(data))
    })
  }
}

export function showMask () {
  return (dispatch, getState) => {
    const balance = getState().withdraw.account.balance
    if (balance < 100) {
      dispatch(changeMaskHandle(1))
      return
    }
    const apply = getState().withdraw.apply
    if (!apply.phone) {
      dispatch(changeMaskHandle(2))
      return
    }
    dispatch(changeMaskHandle(4))
  }
}

export function applyRequest (data) {
  return (dispatch, getState) => {
    ajax.post('/withdrawals', data).then(({data}) => {
      dispatch(changeMaskHandle(3))
      dispatch(requestData())
      dispatch(getApply())
    })
  }
}

let second
let timer

export function sendCode () {
  return (dispatch, getState) => {
    dispatch(dataChangeHandle('code_status', false))
    const mobile = getState().withdraw.apply.phone
    ajax({
      url: '/gen_sign',
      method: 'get',
      baseURL: '/restapi/sms/v1/',
      params: {
        mobile
      }
    }).then(({data}) => {
      ajax({
        url: '/codes',
        method: 'post',
        baseURL: '/restapi/sms/v1/',
        data: {
          mobile,
          type: 'cash_apply',
          sign: data.sign
        }
      }).then(() => {
        second = 60
        dispatch(dataChangeHandle('code_text', '短信已发送'))
        timer = setInterval(function () {
          if (second == 0) {
            dispatch(dataChangeHandle('code_text', `获取验证码`))
            dispatch(dataChangeHandle('code_status', true))
            clearInterval(timer)
            return false
          }
          dispatch(dataChangeHandle('code_text', `${second}S后重试`))
          second--
        }, 1000)
      })
    })

  }
}

export function saveAccount (type, value) {
  return (dispatch, getState) => {
    const state = getState().withdraw.apply
    let data = {...state}
    data[type] = value
    ajax.put('/user/payment_account', data)
    dispatch(valueChange(type, value))
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
    const account = action.payload.account ? action.payload.account : state.account
    return ({...state, fetching: false, list: action.payload.items, account})
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
  [CHANGE_MASK]: (state, action) => {
    return ({...state, mask: action.payload})
  },
  [SET_APPLY_DATA]: (state, action) => {
    return ({...state, apply: action.payload})
  },
  [VALUE_CHANGE]: (state, action) => {
    let data = {...state.apply}
    data[action.payload.type] = action.payload.value
    return ({...state, apply: data})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  list: null,
  account: null,
  begin_time: null,
  end_time: null,
  status: null,
  page: 1,
  per_page: 10,
  total_count: 0,
  mask: 0,
  apply: {},
  code_text: '获取验证码',
  code_status: true
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
