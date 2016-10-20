import {connect} from 'react-redux'
import { fetchData, changeSearch, changeTime, changePage} from '../modules/family'
import {setShowShare} from 'components/Share/modules/share'

import GaneralizeView from '../components/Family'

const mapActionCreators = {
  fetchData,
  setShowShare,
  changeSearch,
  changeTime,
  changePage
}

const mapStateToProps = (state) => ({
  family: state.family
})

export default connect(mapStateToProps, mapActionCreators)(GaneralizeView)
