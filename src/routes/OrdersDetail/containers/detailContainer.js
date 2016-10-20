import { connect } from 'react-redux'
import { setShowEditRemark, setShowEditInfo } from '../modules/detail'

import Detail from '../components/Detail'

const mapActionCreators = {
  setShowEditRemark,
  setShowEditInfo
}

const mapStateToProps = (state) => ({
  detail: state.detail
})

export default connect(mapStateToProps, mapActionCreators)(Detail)
