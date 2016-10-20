import {connect} from 'react-redux'
import {changeType, fetchData} from '../modules/agreement'

import Agreement from '../components/Agreement'

const mapActionCreators = {
  changeType,
  fetchData
}

const mapStateToProps = (state) => ({
  agreement: state.agreement
})

export default connect(mapStateToProps, mapActionCreators)(Agreement)
