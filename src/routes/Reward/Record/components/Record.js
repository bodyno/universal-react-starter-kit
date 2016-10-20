import React, {Component} from 'react'
import './Record.scss'
import { TopTabGroup } from 'components/TopTab'
import BreadCrumb from 'components/BreadCrumb'

import { Table, Icon, DatePicker, Button, Spin } from 'antd'

export default class WithdrawView extends Component {

  componentDidMount () {
    this.props.requestData()
  }

  render () {
    return (
      <div>
        <TopTabGroup withdraw={true} />
        <BreadCrumb to='/reward/withdraw' menu1='我要提现' menu2='消费记录' />
        <div className='page-con'>
          <RecordTable {...this.props} />
        </div>
      </div>
    )
  }
}

const columns = [{
  title: '日期',
  dataIndex: 'date'
}, {
  title: '金额',
  dataIndex: 'money'
}, {
  title: '备注',
  dataIndex: 'remark'
}]

class RecordTable extends Component {
  render () {

    const { changePage } = this.props
    const { list, total_count, per_page, page } = this.props.record

    const pagination = {
      total: total_count,
      current: page,
      pageSize: per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    return (
      <div>
        { list ?
          <Table columns={columns} dataSource={list} pagination={pagination}/> :
          <Spin />
        }
      </div>
    )
  }
}
