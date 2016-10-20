import { connect } from 'react-redux'
import { fetchData, changePage, changeSearch } from '../modules/generalize'

import GaneralizeView from '../components/Generalize'

const mapActionCreators = {
    fetchData,
    changePage,
    changeSearch
}

const mapStateToProps = (state) => ({
    generalize: state.generalize
})

export default connect(mapStateToProps, mapActionCreators)(GaneralizeView)
