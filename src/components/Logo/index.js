import React from 'react'
import {Link} from 'react-router'

const Logo = () => (
  <div className='header-left'>
    <Link to='/' className='ant-title'>
      <div className='site-title'>孩宝<span>U</span>站</div>
      阅读推广管理中心
    </Link>
  </div>
)
export default Logo
