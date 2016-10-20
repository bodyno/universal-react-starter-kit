import { connect } from 'react-redux'
import {
  uploadImageChange,
  putSettingData,
  requestSettingData,
  setShowEditName,
  setShowEditLogo,
  setShowEditQRStore,
  setShowEditSigns,
  setShowEditIntro,
  setShowEditPhone,
  setShowEditPublic,
  setShowEditQROwn,
  setShowEditQQ,
  requestQrcode,
  qrStore,
  requestQrStore
} from '../modules/setting'
import { setShowMore } from 'components/Share/modules/share'

import SettingView from '../components/Setting'

const mapActionCreators = {
  uploadImageChange,
  putSettingData,
  requestSettingData,
  setShowMore,
  setShowEditName,
  setShowEditLogo,
  setShowEditQRStore,
  setShowEditSigns,
  setShowEditIntro,
  setShowEditPhone,
  setShowEditPublic,
  setShowEditQROwn,
  setShowEditQQ,
  requestQrcode,
  qrStore,
  requestQrStore
}

const mapStateToProps = (state) => ({
  setting: state.setting
})

export default connect(mapStateToProps, mapActionCreators)(SettingView)
