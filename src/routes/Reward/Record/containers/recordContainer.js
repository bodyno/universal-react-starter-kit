import { connect } from 'react-redux'
import { requestData, changePage } from '../modules/record'

import Record from '../components/Record'

const mapActionCreators = {
  requestData,
  changePage
}

const mapStateToProps = (state) => ({
  record: state.record
})

export default connect(mapStateToProps, mapActionCreators)(Record)
