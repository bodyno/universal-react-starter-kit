import React from 'react'
import {Icon} from 'antd'
import {Link} from 'react-router'

const UserHead = ({image, logout}) => (
  <div className='user-con'>
    <img className='header-img' src={image} />
    <Icon type='down' className='header-down' />
    <div className='user-hover'>
      <Link to='/setting'>
        <div className='user-item'><i className='iconfont icon-me'></i>个人中心</div>
      </Link>
      <div className='user-item' onClick={logout}><i className='iconfont icon-out'></i>退出</div>
    </div>
  </div>
)
export default UserHead
