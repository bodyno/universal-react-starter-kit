import { connect } from 'react-redux'
import { setShowShare, requestData } from '../modules/home'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
  setShowShare,
  requestData
}

const mapStateToProps = (state) => ({
  home: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
