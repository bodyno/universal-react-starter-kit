import React, {Component} from 'react'
import './TopTab.scss'
import { Link } from 'react-router'

export default class OrderTab extends Component {
  render () {

    const { active } = this.props

    return (
      <div className='tab-con clearfix'>
        <Link to='/orders/all' activeClassName='tab-active' className={ active == 'all' ? 'tab-active' : '' }>
          <div className='tab'>全部</div>
        </Link>
        <Link to='/orders/unpaid' activeClassName='tab-active' className={ active == 'unpaid' ? 'tab-active' : '' }>
          <div className='tab'>待付款</div>
        </Link>
        <Link to='/orders/notshipped' activeClassName='tab-active' className={ active == 'notshipped' ? 'tab-active' : '' }>
          <div className='tab'>待发货</div>
        </Link>
        <Link to='/orders/shipped' activeClassName='tab-active' className={ active == 'shipped' ? 'tab-active' : '' }>
          <div className='tab'>待收货</div>
        </Link>
        <Link to='/orders/completed' activeClassName='tab-active' className={ active == 'completed' ? 'tab-active' : '' }>
          <div className='tab'>交易完成</div>
        </Link>
        <Link to='/orders/closed' activeClassName='tab-active' className={ active == 'closed' ? 'tab-active' : '' }>
          <div className='tab'>交易关闭</div>
        </Link>
      </div>
    )
  }
}
