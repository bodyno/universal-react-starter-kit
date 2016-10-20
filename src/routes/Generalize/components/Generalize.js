import React, {Component} from 'react'
import './Generalize.scss'

import { SearchInput } from 'components/Ant'

import { Table } from 'antd'

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
  title: '童书馆名称',
  dataIndex: 'store_name'
}, {
  title: '加入推广时间',
  dataIndex: 'add_time'
}, {
  title: '操作',
  dataIndex: 'store_id',
  className: 'column-right',
  render: (text, record) => (
    <a target='_blank' href={`https://${record.domain}.baobaobooks.com`}>访问童书馆</a>
  )
}]

export default class GeneralizeView extends Component {

  componentDidMount () {
    if (this.props.generalize.items) return
    this.props.fetchData()
  }

  render () {

    const { generalize, changePage } = this.props

    const { isFetching, items, q } = generalize

    const pagination = {
      total: generalize.total_count,
      current: generalize.page,
      pageSize: generalize.per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    return (
      <div>
        <div className="p-title">推广伙伴</div>

        <div className='p-con'>
          <SearchInput placeholder="用户名 / 童书馆名称"  value={q} style={{ width: 350 ,paddingBottom:'20px' }} submitValue={this.props.changeSearch.bind(this)} />
          <Table loading={isFetching} columns={columns} dataSource={items} pagination={pagination} />
        </div>
      </div>

    )
  }
}
