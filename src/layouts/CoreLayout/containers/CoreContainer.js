import { connect } from 'react-redux'
import { setShowShare } from 'components/Share/modules/share'
import { getInitData, logout } from 'reducer/core'

import CoreLayout from '../components/CoreLayout'

const mapDispatchToProps = {
  setShowShare,
  getInitData,
  logout
}

const mapStateToProps = (state) => ({
  share: state.share,
  core: state.core
})

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
