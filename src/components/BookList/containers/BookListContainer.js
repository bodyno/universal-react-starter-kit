import { connect } from 'react-redux'
import { fetchAllBooks, checkChange, changePage, changeSearch, changePerPage, sortChange } from '../modules/bookList'

import BookList from '../components/BookList'

const mapActionCreators = {
  fetchAllBooks,
  checkChange,
  changePage,
  changeSearch,
  changePerPage,
  sortChange
}

const mapStateToProps = (state) => ({
  bookList: state.bookList,
  core: state.core
})

export default connect(mapStateToProps, mapActionCreators)(BookList)
