import { connect } from 'react-redux'
import { fetchNewBooks, checkChange, changePage, changeSearch, changePerPage, sortChange } from '../modules/new'

import New from '../components/New'

const mapActionCreators = {
  fetchNewBooks,
  checkChange,
  changePage,
  changeSearch,
  changePerPage,
  sortChange
}

const mapStateToProps = (state) => ({
  booksNew: state.booksNew
})

export default connect(mapStateToProps, mapActionCreators)(New)
