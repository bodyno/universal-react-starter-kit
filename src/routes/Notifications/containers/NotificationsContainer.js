import { connect } from 'react-redux'
import { requestData, changeIndex, markRead, changePage } from '../modules/notifications'

import Notifications from '../components/Notifications'

const mapActionCreators = {
  requestData,
  changeIndex,
  markRead,
  changePage
}

const mapStateToProps = (state) => ({
  notifications: state.notifications
})

export default connect(mapStateToProps, mapActionCreators)(Notifications)
