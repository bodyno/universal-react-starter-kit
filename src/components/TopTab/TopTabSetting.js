import React, {Component} from 'react'
import './TopTab.scss'
import { Link } from 'react-router'

export default class TopTabSetting extends Component {
  render () {

    let active = false
    const { location } = this.props
    if (location && location.pathname.indexOf('setting/address') != -1) {
      active = true
    }

    return (
      <div className='tab-con clearfix'>
        <Link to='/setting/setting' activeClassName='tab-active' className={active ? 'tab-active' : ''}>
          <div className='tab'>童书馆设置</div>
        </Link>
        {/*<Link to='/setting/guide' activeClassName='tab-active'>
          <div className='tab'>使用说明</div>
        </Link>*/}
        <Link to='/setting/feedback' activeClassName='tab-active'>
          <div className='tab'>意见反馈</div>
        </Link>
      </div>
    )
  }
}
