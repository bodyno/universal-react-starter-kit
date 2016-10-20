import { createSelector } from 'reselect'
import collection from 'lodash/collection'

const getIndex = (state) => state.customAdd.selectDirIndex
const getData = (state) => state.customAdd.submenu

export const nowDir = createSelector(
  [ getIndex, getData ],
  (index, data) => {
    if (!data.length) return data
    const result = collection.find(data, {id: index})
    return result ? result : {
      showSubTitle: true,
      subTitle: '',
      subBooks: []
    }
  }
)
