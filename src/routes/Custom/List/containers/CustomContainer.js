import { connect } from 'react-redux'
import { fetchData, changeShowSys, sort, deleteBooks, firstPage, copyBooks } from '../modules/custom'
import { showList } from '../selectors'
import { showShare } from 'components/Share/modules/share'

import Custom from '../components/Custom'

const mapActionCreators = {
  showShare,
  fetchData,
  changeShowSys,
  sort,
  deleteBooks,
  firstPage,
  copyBooks
}

const mapStateToProps = (state) => ({
  custom: state.custom,
  list: showList(state)
})

export default connect(mapStateToProps, mapActionCreators)(Custom)
