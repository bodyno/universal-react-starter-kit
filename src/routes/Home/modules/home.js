import ajax from 'components/Ajax'
// ------------------------------------
// Constants
// ------------------------------------
const SET_SHOWSHARE = 'SET_SHOWSHARE'
const RECEIVE_DATA = 'RECEIVE_DATA_HOME'
const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA_HOME'

// ------------------------------------
// Actions
// ------------------------------------

export function setShowShare (data) {
  return {
    type: SET_SHOWSHARE,
    payload: data
  }
}

function receiveData (data) {
  return {
    type: RECEIVE_DATA,
    payload: data
  }
}

function receiveChartData (data, type) {
  return {
    type: RECEIVE_CHART_DATA,
    payload: {
      data,
      type
    }
  }
}

export function requestData () {
  return (dispatch, getState) => {
    ajax.get('/statistics/today').then(({data}) => {
      dispatch(receiveData(data))
    })

    ajax.get('/statistics/flow').then(({data}) => {
      dispatch(receiveChartData(data, 'flow'))
    })

    ajax.get('/statistics/sales').then(({data}) => {
      dispatch(receiveChartData(data, 'sales'))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SHOWSHARE]: (state, action) => {
    return ({...state, showShare: action.payload})
  },
  [RECEIVE_DATA]: (state, action) => {
    return ({...state, today: action.payload})
  },
  [RECEIVE_CHART_DATA]: (state, action) => {
    let data = {}
    data[action.payload.type] = action.payload.data
    return ({...state, data: {...state.data, ...data}})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  showShare: false,
  today: null,
  data: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
