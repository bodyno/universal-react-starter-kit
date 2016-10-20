import { connect } from 'react-redux'
import { fetchZen, clearZen } from '../modules/over'

import OverView from '../components/Over'

const mapActionCreators = {
  fetchZen,
  clearZen
}

const mapStateToProps = (state) => ({
  apply: state.apply
})

export default connect(mapStateToProps, mapActionCreators)(OverView)
