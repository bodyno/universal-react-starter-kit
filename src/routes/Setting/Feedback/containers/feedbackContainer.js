import { connect } from 'react-redux'
import { setPreviewImage, uploadImageChange, deleteImageChange, postFeedback } from '../modules/feedback'

import FeedbackView from '../components/Feedback'

const mapActionCreators = {
  setPreviewImage,
  uploadImageChange,
  deleteImageChange,
  postFeedback
}

const mapStateToProps = (state) => ({
  feedback: state.feedback
})

export default connect(mapStateToProps, mapActionCreators)(FeedbackView)
