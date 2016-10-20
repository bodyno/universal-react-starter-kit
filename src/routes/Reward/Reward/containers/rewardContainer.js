import { connect } from 'react-redux'
import { requestData, changePage, dataChange, dateChange, sortChange } from '../modules/reward'
import { sendCode, saveAccount, valueChange, changeMaskHandle, showMask, requestData as setAccount, getApply } from 'routes/Reward/Withdraw/modules/withdraw'

import RewardView from 'components/Reward'

const mapActionCreators = {
  requestData,
  changePage,
  dataChange,
  dateChange,
  sortChange,
  changeMaskHandle,
  showMask,
  setAccount,
  getApply,
  sendCode,
  saveAccount,
  valueChange
}

const mapStateToProps = (state) => ({
  reward: state.reward,
  withdraw: state.withdraw
})

export default connect(mapStateToProps, mapActionCreators)(RewardView)
