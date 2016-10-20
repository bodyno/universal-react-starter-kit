import ajax from 'components/Ajax'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_DATA = 'RECEIVE_DATA_STATISTIC'
const CHANGE_DATA = 'CHANGE_DATA_STATISTIC'

// ------------------------------------
// Actions
// ------------------------------------

function receiveData (data, type) {
  return {
    type: RECEIVE_DATA,
    payload: {
      data,
      type
    }
  }
}

function changeDataHandle (data, type) {
  return {
    type: CHANGE_DATA,
    payload: {
      data,
      type
    }
  }
}

export function changeData (data, type) {
  return (dispatch, getState) => {
    dispatch(changeDataHandle(data, type))
    if (type == 'flow') {
      dispatch(requestFlowData())
    } else {
      dispatch(requestSalesData())
    }
  }
}

export function requestDate () {
  return (dispatch, getState) => {
    ajax.get('/statisticals/total').then(({data}) => {
      dispatch(receiveData(data, 'total'))
    })
    dispatch(requestFlowData())
    dispatch(requestSalesData())
  }
}

export function requestFlowData () {
  return (dispatch, getState) => {
    const state = getState().statistic.flow
    ajax.get('/statistics/flow', {
      params: {
        begin_time: state.begin_time,
        end_time: state.end_time,
        latest_day: state.latest_day
      }
    }).then(({data}) => {
      dispatch(receiveData(data, 'flow'))
    })
  }
}

export function requestSalesData () {
  return (dispatch, getState) => {
    const state = getState().statistic.sales
    ajax.get('/statistics/sales', {
      params: {
        begin_time: state.begin_time,
        end_time: state.end_time,
        latest_day: state.latest_day
      }
    }).then(({data}) => {
      dispatch(receiveData(data, 'sales'))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_DATA]: (state, action) => {
    let data = {}
    data[action.payload.type] = action.payload.data
    return ({...state, data: {...state.data, ...data}})
  },
  [CHANGE_DATA]: (state, action) => {
    let data = {}
    data[action.payload.type] = ({...state[action.payload.type], ...action.payload.data})
    return ({...state, ...data})
  }
}

// -----------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  flow: {
    latest_day: 7
  },
  sales: {
    latest_day: 7
  }
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
