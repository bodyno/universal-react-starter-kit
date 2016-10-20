import React, { Component } from 'react'
import numImg from '../assets/404.png'
import pageImg from '../assets/page_404.png'
import './PageNotFound.scss'
import { withRouter } from 'react-router'

class PageNotFound extends Component {
  render () {
    const props = this.props
    return (
      <div>
        <div className='not-fount-margin'></div>
        <div className='not-fount-con clearfix'>
          <img src={pageImg} className='not-fount-left' width='145' />
          <div className='not-fount-right'>
            <img src={numImg} />
            <h2>
              页面不存在<br />
              <a className='not-fount-back' onClick={props.router.goBack}>返回</a>
            </h2>
          </div>
        </div>
      </div>
    )
  }
}

PageNotFound.propTypes = {
  router: React.PropTypes.object.isRequired
}

export default withRouter(PageNotFound)
