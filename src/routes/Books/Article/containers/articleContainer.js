import { connect } from 'react-redux'
import { requestData, changePage, setId } from '../modules/article'

import ArticleView from '../components/Article'

const mapActionCreators = {
  requestData,
  changePage,
  setId
}

const mapStateToProps = (state) => ({
  article: state.article
})

export default connect(mapStateToProps, mapActionCreators)(ArticleView)
