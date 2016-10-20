import { connect } from 'react-redux'
import { changeType, fetchAllData, changePage, showToolTips } from '../modules/order'

import Order from '../components/Order'

const mapActionCreators = {
  changeType,
  fetchAllData,
  changePage,
  showToolTips
}

const mapStateToProps = (state) => ({
  order: state.order
})

export default connect(mapStateToProps, mapActionCreators)(Order)
