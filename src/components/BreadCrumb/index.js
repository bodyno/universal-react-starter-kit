import React from 'react'
import {Link} from 'react-router'

const BreadCrumb = ({to, menu1, menu2}) => (
  <Link to={to}>
    <div className='stitle'>
      <i className='anticon anticon-circle-o-left'></i>
      <span>{menu1} / <em>{menu2}</em></span>
    </div>
  </Link>
)
export default BreadCrumb
