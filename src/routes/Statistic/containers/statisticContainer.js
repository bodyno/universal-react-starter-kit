import { connect } from 'react-redux'
import { requestDate, changeData } from '../modules/statistic'

import Statistic from '../components/Statistic'

const mapActionCreators = {
  requestDate,
  changeData
}

const mapStateToProps = (state) => ({
  statistic: state.statistic
})

export default connect(mapStateToProps, mapActionCreators)(Statistic)
