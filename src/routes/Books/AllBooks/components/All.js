import React, {Component} from 'react'
import { BooksTop } from 'components/TopTab'
import './All.scss'
import BookList from 'components/BookList'
import TableMinWidth from 'components/TableMinWidth'

class Books extends Component {

  render () {
    return (
      <div>
        <BooksTop />
        <div className="page-con" style={{minWidth: 1100}}>
          <BookList {...this.props} />
        </div>
      </div>
    )
  }
}

export default TableMinWidth({
  width: 1150
})(Books)
