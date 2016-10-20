import { connect } from 'react-redux'
import { fetchZen, clearZen } from '../modules/apply'

import ApplyView from '../components/Apply'

const mapActionCreators = {
  fetchZen,
  clearZen
}

const mapStateToProps = (state) => ({
  apply: state.apply
})

export default connect(mapStateToProps, mapActionCreators)(ApplyView)
