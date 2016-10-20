import { connect } from 'react-redux'
import { setShowVideo, requestGuideData } from '../modules/guide'

import GuideView from '../components/Guide'

const mapActionCreators = {
  setShowVideo,
  requestGuideData
}

const mapStateToProps = (state) => ({
  guide: state.guide
})

export default connect(mapStateToProps, mapActionCreators)(GuideView)
