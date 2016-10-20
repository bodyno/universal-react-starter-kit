import React, {Component} from 'react'
import './TopTab.scss'
import { Link } from 'react-router'

export default class extends Component {
  render () {

    return (
      <div className='tab-con clearfix'>
        <Link to='/books/all' activeClassName='tab-active'>
          <div className='tab'>全部童书</div>
        </Link>
        <Link to='/books/new' activeClassName='tab-active'>
          <div className='tab'>新书推荐</div>
        </Link>
      </div>
    )
  }
}
