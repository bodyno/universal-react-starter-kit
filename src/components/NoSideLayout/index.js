import React, {Component} from 'react'
import './NoSideLayout.scss'
import UserHead from 'components/UserHead'
import Copyrights from 'components/Copyrights'
import Logo from 'components/Logo'

export default class extends Component {
  render () {
    return (
      <div className='no-side'>
        <div className='header-con'>
          <div className='header clearfix'>
            <Logo />
            <UserHead image={this.props.core.user_info.avatar_thumb} logout={this.props.logout} />
          </div>
        </div>
        { this.props.children }
        <Copyrights />
      </div>
    )
  }
}
