import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.custom.showSys
const getTodos = (state) => state.custom.list

export const showList = createSelector(
  [ getVisibilityFilter, getTodos ],
  (type, data) => {
    if (type) {
      return data.filter(item => !item.is_sys)
    } else {
      return data
    }
  }
)
