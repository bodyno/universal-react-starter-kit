import { connect } from 'react-redux'
import { fetchZen, clearZen } from '../modules/detail'

import DetailView from '../components/Detail'

const mapActionCreators = {
    fetchZen,
    clearZen
}

const mapStateToProps = (state) => ({
    detail: state.detail
})

export default connect(mapStateToProps, mapActionCreators)(DetailView)
