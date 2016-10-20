import React, {Component} from 'react'
import './Family.scss'
import {Link} from 'react-router'
import {SearchInput} from 'components/Ant'
import noneFamily from '../assets/family_none.png'

import {Table, DatePicker, Button} from 'antd'
const RangePicker = DatePicker.RangePicker

const columns = [{
  title: '用户名',
  dataIndex: 'user_name',
  render: (text, record) => (
    <div className='tr-name'>
      <img className="image" src={record.avatar} width="46" height="46" />
      <span className="name">{text}</span>
    </div>
  )
}, {
  title: '手机号码',
  dataIndex: 'user_phone'
}, {
  title: '加入时间',
  dataIndex: 'add_time'
}, {
  title: '订单数',
  dataIndex: 'order_count'
}, {
  title: '购物金额',
  dataIndex: 'amount'
}, {
  title: '操作',
  dataIndex: 'user_id',
  className: 'column-right',
  render: (text) => <Link to='/orders/all'>查看订单</Link>
}]

export default class Family extends Component {

  componentDidMount () {
    document.getElementsByClassName('p-con')[0].style.minHeight = document.body.offsetHeight - 232 + 'px'
    if (this.props.family.items) return
    this.props.fetchData()
  }

  onChange(dates, dateStrings) {
    this.props.changeTime({begin_time: dateStrings[0],end_time: dateStrings[1]})
  }

  render() {

    const showShareHandle = () => {
      this.props.setShowShare(true)
    }

    const { family, changePage, changeSearch } = this.props
    const { q } = family

    const { isFetching, items } = family

    const pagination = {
      total: family.total_count,
      current: family.page,
      pageSize: family.per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    return (
      <div>
        <div className='p-title'>
          阅读家庭
          <span>（在您的童书馆有订单的会员）</span>
        </div>
        <div className='p-con'>
          { items ?
            <div>
              { !items.length && q == null ?
                <NonFamily />
                :
                <div>
                  <div className='family-top'>
                    <div className='family-time'>
                      <RangePicker style={{width: 246}} onChange={this.onChange.bind(this)} />
                    </div>
                    <div className='fix-position'>
                      <SearchInput placeholder='用户名／手机号' style={{width: 250}} value={q} submitValue={changeSearch.bind(this)} />
                    </div>
                    <div className='fr'>
                      <Button onClick={showShareHandle} type='primary' className='btn green mt-2'>邀请家庭</Button>
                    </div>
                  </div>
                  <Table loading={isFetching} columns={columns} dataSource={items} pagination={pagination}/>
                </div>
              }
            </div> : ''
          }
        </div>
      </div>

    )
  }
}

const NonFamily = ({show}) => (
  <div className='family-none'>
    <img src={noneFamily} />
    <div className='title'>您现在还没有阅读家庭哦，赶快邀请更多家庭加入吧～</div>
    <div className='text'>（PS：在童书馆下过单的用户才能成为您的阅读家庭）</div>
    <Button type='primary' className='btn green' onClick={show}>邀请阅读家庭</Button>
  </div>
)
