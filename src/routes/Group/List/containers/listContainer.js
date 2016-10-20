import { connect } from 'react-redux'
import { fetchZen, clearZen } from '../modules/list'

import ListView from '../components/List'

const mapActionCreators = {
  fetchZen,
  clearZen
}

const mapStateToProps = (state) => ({
  list: state.list
})

export default connect(mapStateToProps, mapActionCreators)(ListView)
