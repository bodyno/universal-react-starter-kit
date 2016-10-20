import React, {Component} from 'react'
import './TopTab.scss'
import { Link } from 'react-router'

export default class TopTabGroup extends Component {
  render () {

    const withdrawActive = this.props.withdraw ? true : false

    return (
      <div className='tab-con clearfix'>
        <Link to='/reward/reward' activeClassName='tab-active'>
          <div className='tab'>我的奖励</div>
        </Link>
        <Link to='/reward/part' activeClassName='tab-active'>
          <div className='tab'>我的分成</div>
        </Link>
        <Link to='/reward/withdraw' activeClassName='tab-active' className={withdrawActive ? 'tab-active' : ''}>
          <div className='tab'>我要提现</div>
        </Link>
      </div>
    )
  }
}
