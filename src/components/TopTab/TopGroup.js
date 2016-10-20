import React, {Component} from 'react'
import './TopTab.scss'
import { Link } from 'react-router'

export default class TopGroup extends Component {

  render () {

    let active = false
    if (typeof this.props.location != 'undefined' && this.props.location.pathname.indexOf('/group/detail') != -1) {
      active = true
    }

    return (
      <div className='tab-con clearfix'>
        <Link to='/group/list' activeClassName='tab-active' className={active ? 'tab-active' : ''}>
          <div className='tab'>已申请</div>
        </Link>
        <Link to='/group/apply' activeClassName='tab-active'>
          <div className='tab'>可申请</div>
        </Link>
        <Link to='/group/over' activeClassName='tab-active'>
          <div className='tab'>已结算</div>
        </Link>
      </div>
    )
  }
}
