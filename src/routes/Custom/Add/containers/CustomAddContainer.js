import { connect } from 'react-redux'
import { setPreview, setShowBooks, setShowAddBooks, getImageList, setSelectImage, setTitle, setTitleError, setDesc, uploadImage, setSubTitleError, setSubTitle, setShowSubTitle, addSubBook,
  addNewDir, saveList, changeDirIndex, deleteBook, sortBook, deleteDir, sortDir, deleteImg, initData } from '../modules/customAdd'

import CustomAdd from '../components/CustomAdd'
import { nowDir } from '../selectors'

const mapActionCreators = {
  setPreview,
  setShowBooks,
  setShowAddBooks,
  getImageList,
  setSelectImage,
  setTitle,
  setTitleError,
  setDesc,
  uploadImage,
  setSubTitleError,
  setSubTitle,
  setShowSubTitle,
  addSubBook,
  addNewDir,
  saveList,
  changeDirIndex,
  deleteBook,
  sortBook,
  deleteDir,
  sortDir,
  deleteImg,
  initData
}

const mapStateToProps = (state) => ({
  customAdd: state.customAdd,
  nowDir: nowDir(state)
})

export default connect(mapStateToProps, mapActionCreators)(CustomAdd)
