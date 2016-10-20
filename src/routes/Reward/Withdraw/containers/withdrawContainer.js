import { connect } from 'react-redux'
import { requestData, changePage, dateChange, dataChange, showMask, getApply, changeMaskHandle, applyRequest, valueChange, saveAccount, sendCode } from '../modules/withdraw'

import WithdrawView from '../components/Withdraw'

const mapActionCreators = {
  requestData,
  changePage,
  dateChange,
  dataChange,
  showMask,
  getApply,
  changeMaskHandle,
  applyRequest,
  valueChange,
  saveAccount,
  sendCode
}

const mapStateToProps = (state) => ({
  withdraw: state.withdraw
})

export default connect(mapStateToProps, mapActionCreators)(WithdrawView)
