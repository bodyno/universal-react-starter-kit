import { connect } from 'react-redux'
import Address from '../components/Address'
import { requestCurAddress, putCurAddress } from '../modules/address'

const mapActionCreators = {
  requestCurAddress,
  putCurAddress
}

const mapStateToProps = (state) => ({
  address: state.address
})

export default connect(mapStateToProps, mapActionCreators)(Address)
