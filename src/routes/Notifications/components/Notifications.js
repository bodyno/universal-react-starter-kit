import React, {Component} from 'react'
import './Notifications.scss'
import { Pagination, Spin } from 'antd'

export default class Notifications extends Component {

  componentDidMount () {
    this.props.requestData()
  }

  render () {

    const { changeIndex, markRead, changePage } = this.props
    const { data, nowExpand, total_count, page, per_page } = this.props.notifications

    return (
      <div className='n'>
        <div className='page-con'>
          <div className='title'>通知中心</div>
          { data ?
            <div>
              <div className='n-list'>
                <div>
                  { data.items.map((item, index) => (
                    <NotiItem {...item} key={index} nowExpand={nowExpand} changeIndex={changeIndex} markRead={markRead} />
                  )) }
                </div>
              </div>
              <div className='clearfix'>
                <div className='pagination-con'>
                  <Pagination total={total_count} showSizeChanger={true} showQuickJumper={true} current={page} pageSize={per_page} onChange={changePage} onShowSizeChange={changePage} />
                </div>
              </div>
            </div>
            :
            <Spin />
          }
        </div>
      </div>
    )
  }
}

class NotiItem extends Component {
  render () {

    const {title, content, add_time, state, nowExpand, id, changeIndex, markRead} = this.props

    let className = ['n-item']
    if (nowExpand == id) {
      className.push('expand')
    }
    if (state) {
      className.push('read')
    }

    const changeIndexHandle = (id) => {
      if (id == nowExpand) {
        id = null
      }
      changeIndex(id)
      if (!state) markRead(id)
    }

    return (
      <div className={className.join(' ')} onClick={changeIndexHandle.bind(this, id)}>
        <span className='n-text'>{title}</span>
        <span className='n-time'>{add_time}</span>
        { nowExpand == id ?
          <div className='n-more'>
            {content}
          </div> : ''
        }
      </div>
    )
  }
}
