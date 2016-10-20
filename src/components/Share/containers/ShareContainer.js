import { connect } from 'react-redux'
import { setShowShare, setShowMore } from '../modules/share'

import Share from '../components/Share'

const mapDispatchToProps = {
  setShowShare,
  setShowMore
}

const mapStateToProps = (state) => ({
  share: state.share,
  core: state.core
})

export default connect(mapStateToProps, mapDispatchToProps)(Share)
