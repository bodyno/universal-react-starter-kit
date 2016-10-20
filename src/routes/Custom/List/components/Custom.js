import React, {Component} from 'react'
import './Custom.scss'
import { Switch, Tooltip, Popconfirm, Spin } from 'antd'
import {Link} from 'react-router'
import Sortable from 'plugin/sortable'
import Share from 'components/Share'

export default class extends Component {

  componentDidMount () {
    this.props.fetchData()
  }

  render () {

    const { changeShowSys, list, custom: { showSys }}  = this.props

    return (
      <div>
        <div className='p-title'>自定义书单</div>
        <div className='page-con'>
          <div className='custom-con'>
            <div className='custom-top'>
              <div>编辑书单中</div>
              <div className='text'>您可以左边编辑书单，右边查看实时效果；鼠标拖动书单可调整书单先后顺序。</div>
              <div className='text-s'>最多可推荐10个书单到首页，您还能推荐7个书单到首页</div>
            </div>
            { list.length ?
              <div className='clearfix'>
                <div className='custom-left'>
                  <div className='custom-left-title'>
                    <label>隐藏孩宝推荐书单</label>
                    <Switch defaultChecked={showSys} size='small' onChange={changeShowSys} />
                  </div>
                  {/*<div className='custom-notification'>*/}
                  {/*自定义书单个数限制为50个，请先删除已有书单。*/}
                  {/*</div>*/}
                  <div className='custom-list'>
                    <div className='custom-list-con clearfix'>
                      <Link to='/custom/add' className='custom-add'>
                        添加书单
                      </Link>
                      { list.length ?
                        <CustomItemList {...this.props} /> :
                        null
                      }
                    </div>
                  </div>
                </div>
                <div className='custom-right'>
                  <iframe src='https://shopdev.baobaobooks.net?mobile=mobile' frameBorder='0' width='375' height='584'></iframe>
                </div>
              </div> :
              <Spin />
            }
          </div>
        </div>
        <Share {...this.props} />
      </div>
    )
  }
}

let sortable

class CustomItemList extends Component {

  componentDidMount () {
    this.initEvent()
  }

  componentDidUpdate () {
    this.initEvent()
  }

  initEvent () {
    const { list, sort } = this.props
    const el = document.getElementById('sort-con')
    sortable = Sortable.create(el, {
      onEnd: function (e) {
        sort(list[e.oldIndex].sortId, list[e.newIndex].sortId)
      }
    })
  }

  delBook = (id) => {
    const { deleteBooks } = this.props
    deleteBooks(id)
  }

  render () {

    const { list, firstPage, copyBooks, showShare } = this.props

    return (
      <ul id='sort-con'>
        { list.map((item,index) =>
          <CustomItem key={index} {...item} delBook={this.delBook} copyBooks={copyBooks} firstPage={firstPage} showShare={showShare} />)
        }
      </ul>
    )
  }
}

const CustomItem = ({id, name, pic, is_sys, is_show, delBook, firstPage, copyBooks, showShare, share_url, brief}) => (
  <li className={ is_sys ? 'custom-item custom-item-sys' : 'custom-item'}>
    <div className='custom-item-top'>
      <img src={pic} />
      <div className='custom-name'>{name}</div>
    </div>
    <div className='clearfix'>
      <div className='custom-icon'>
        <Tooltip title="推荐到首页" placement="bottom">
          <i className={is_show? 'iconfont icon-recommend active' : 'iconfont icon-recommend'} onClick={firstPage.bind(this, id, !is_show, is_sys)}></i>
        </Tooltip>
        { !is_sys ?
          <Link to={`/custom/edit/${id}`}>
            <Tooltip title="编辑书单" placement="bottom">
              <i className='iconfont icon-edit'></i>
            </Tooltip>
          </Link>
          : null
        }
        <Tooltip title="复制书单" placement="bottom">
          <i className='iconfont icon-copy' onClick={copyBooks.bind(this, id)}></i>
        </Tooltip>
        <Tooltip title="分享书单" placement="bottom">
          <i className='iconfont icon-share' onClick={showShare.bind(this, true, share_url, brief, true)}></i>
        </Tooltip>
        { !is_sys ?
          <Popconfirm title="确定要删除这个书单吗？" onConfirm={delBook.bind(this, id)} okText="确定" cancelText="取消">
            <Tooltip title="删除书单" placement="bottom">
              <i className='iconfont icon-delete'></i>
            </Tooltip>
          </Popconfirm>
          : null
        }
      </div>
    </div>
  </li>
)
