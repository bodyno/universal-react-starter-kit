import { connect } from 'react-redux'
import { changeType, fetchData } from '../modules/frozen'
import { logout } from 'reducer/core'

import Frozen from '../components/Frozen'

const mapActionCreators = {
  changeType,
  fetchData,
  logout
}

const mapStateToProps = (state) => ({
  frozen: state.frozen,
  core: state.core
})

export default connect(mapStateToProps, mapActionCreators)(Frozen)
