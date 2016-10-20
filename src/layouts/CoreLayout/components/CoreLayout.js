import React, { Component } from 'react'
import 'styles/core.scss'
import 'styles/antd.scss'
import './CoreLayout.scss'

import serviceImg from '../assets/qrcode_service.png'

import { Menu, Icon, Tooltip, Spin } from 'antd'

import { IndexLink, Link } from 'react-router'
import Copyrights from 'components/Copyrights'
import UserHead from 'components/UserHead'
import Logo from 'components/Logo'
import Scrollbars from 'react-custom-scrollbars'
import throttle from 'lodash/throttle'

class CoreLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: true,
      showScroll: false,
      scrollHeight: 0
    }
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  componentDidMount () {
    this.props.getInitData()
    const ele = document.getElementById('main')
    if (ele) ele.style.minHeight = window.innerHeight - 144 + 'px'
    this.reSizeScroll()
    this.initEvent()
  }

  reSizeScroll () {
    const showScroll = window.innerHeight < 680 ? true : false
    if (showScroll) {
      var scrollHeight = window.innerHeight - 160
    }
    this.setState({
      showScroll,
      scrollHeight
    })
  }

  initEvent () {
    window.addEventListener('resize', throttle(this.reSizeScroll.bind(this), 100))
  }

  render() {
    const collapse = this.state.collapse
    const showShareHandle = () => {
      this.props.setShowShare(true)
    }

    let noShow = false
    if (
      this.props.location.pathname == '/frozen' ||
      this.props.location.pathname == '/agreement' ||
      this.props.location.pathname == '/apply'
    ) {
      noShow = true
    }

    const { core, logout } = this.props

    return (
      <div>
        { core.store_info ?
          <div>
            { !noShow ?
              <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
                <aside className='ant-layout-sider'>
                  <div className='ant-name-con'>
                    <Link to='/setting'>
                      <div className='ant-layout-logo'>
                        <img className='user-head' src={core.store_info.logo} />
                      </div>
                    </Link>
                    <Link to='/setting' className='logo-name'>
                      <span className='logo-user'>Alice...</span>童书馆
                    </Link>
                  </div>
                  { this.state.showScroll ?
                    <MenuWithScroll height={this.state.scrollHeight} /> :
                    <MenuContent />
                  }
                  <div className='service'>
                    <div className='text'>在线客服</div>
                    <div className='qrcode-hover'>
                      <div className='title'>您的专属客服</div>
                      <div>
                        <img src={serviceImg} />
                      </div>
                      <div className='qq'>米娜</div>
                      <div className='contact'><i className='anticon anticon-phone'></i>{core.contact.phone}</div>
                      <div className='mail'><i className='anticon anticon-mail'></i><a href='mailto:service@baobaobooks.com'>{core.contact.mail}</a></div>
                    </div>
                  </div>
                  <div className='ant-aside-action' onClick={this.onCollapseChange.bind(this)}>
                    {collapse ? <Icon type='right' /> : <Icon type='left' />}
                  </div>
                </aside>
                <div className='ant-layout-main'>
                  <div className='ant-layout-header clearfix'>
                    <Logo />
                    <div className='header-right'>
                      <Tooltip title="通知中心" placement="bottom">
                        <Link to='/notifications' className='header-icon noti-con'>
                          <i className='iconfont icon-notifications'/>
                          <span>2</span>
                        </Link>
                      </Tooltip>
                      <div className='header-icon view-lib-con'>
                        <i className='iconfont icon-visibility'/>
                        <div className='view-lib'>
                          <img src={core.urls.store_qrcode} width='114' />
                          <div className='text'>
                            打开微信扫一扫<br />
                            手机查看我的童书馆
                          </div>
                          <a href={core.urls.store_url} target='_blank' className='look-btn'>查看电脑端童书馆</a>
                        </div>
                      </div>
                      <Tooltip title="分享童书馆" placement="bottom">
                        <div onClick={showShareHandle} className='header-icon'>
                          <i className='iconfont icon-share'/>
                        </div>
                      </Tooltip>
                      <div className='noti-hover'>
                        <div className='anticon anticon-plus'></div>
                        <div className='noti-time'>2016年6月1日</div>
                        <div className='noti-text'>
                          紧急通知：3月19日（周六）孩宝仓库停止发货一天。
                        </div>
                        <div className='noti-time'>2016年6月1日</div>
                        <div className='noti-text'>
                          紧急通知：3月19日（周六）孩宝仓库停止发货一天。
                        </div>
                        <div className='noti-more'>查看更多</div>
                      </div>
                      <UserHead image={core.user_info.avatar_thumb} logout={logout} />
                    </div>
                  </div>
                  <div className='ant-layout-container'>
                    <div className='ant-layout-content' id='main'>
                      <div>
                        {this.props.children}
                      </div>
                    </div>
                  </div>
                  <Copyrights />
                </div>
              </div>
              :
              <div>
                {this.props.children}
              </div>
            }
          </div> :
          <Spin />
        }
      </div>
    )
  }
}

const MenuContent = () => (
  <div className='ant-menu ant-menu-inline ant-menu-dark ant-menu-root'>
    <IndexLink to='/' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-home'/><span className='nav-text'>首页</span>
    </IndexLink>
    <Link to='/group' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-tag-o'/><span className='nav-text'>团购</span>
    </Link>
    <Link to='/custom' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='iconfont icon-logo'/><span className='nav-text'>自定义书单</span>
    </Link>
    <Link to='/books' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='iconfont icon-book1'/><span className='nav-text'>童书</span>
    </Link>
    <Link to='/orders' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-file-text'/><span className='nav-text'>订单</span>
    </Link>
    <Link to='/reward' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-pay-circle-o'/><span className='nav-text'>奖励</span>
    </Link>
    <Link to='/generalize' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-team'/><span className='nav-text'>推广伙伴</span>
    </Link>
    <Link to='/family' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='iconfont icon-family'/><span className='nav-text'>阅读家庭</span>
    </Link>
    <Link to='/statistic' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-line-chart'/><span className='nav-text'>统计</span>
    </Link>
    <Link to='/setting' className='ant-menu-item' activeClassName='ant-menu-item-selected'>
      <i className='anticon anticon-setting'/><span className='nav-text'>设置</span>
    </Link>
    <Menu style={{display: 'none'}} />
  </div>
)

const MenuWithScroll = ({height}) => (
  <Scrollbars className='menu-scroll-con' style={{ height: height }} renderTrackHorizontal={()=>(<div></div>)} renderThumbHorizontal={()=>(<div></div>)} autoHide={true}>
    <MenuContent />
  </Scrollbars>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
