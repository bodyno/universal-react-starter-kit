import React, {Component} from 'react'
import './Withdraw.scss'
import { TopTabGroup } from 'components/TopTab'
import { Link } from 'react-router'
import Mask from 'components/Withdraw'

import { Table, Icon, DatePicker, Button, Spin, notification } from 'antd'
const RangePicker = DatePicker.RangePicker

const columns = [{
  title: '申请日期',
  dataIndex: 'apply_date'
}, {
  title: '申请金额',
  dataIndex: 'money'
}, {
  title: '支付宝交易号',
  dataIndex: 'pay_no'
}, {
  title: '支付账号',
  dataIndex: 'pay_account'
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '付款时间',
  dataIndex: 'pay_time'
}];

export default class WithdrawView extends Component {

  componentDidMount () {
    this.props.requestData()
    this.props.getApply()
  }

  render () {

    const { changeType, changePage, dateChange, dataChange, showMask } = this.props
    const { status, list, total_count, per_page, page, account, fetching, mask } = this.props.withdraw

    const pagination = {
      total: total_count,
      current: page,
      pageSize: per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    const TypeTab = (
      <div className='type'>
        <div onClick={dataChange.bind(this, 'status', null)} className={status == null ? 'type-item type_active' : 'type-item'}>全部</div>
        <div onClick={dataChange.bind(this, 'status', 1)} className={status == 1 ? 'type-item type_active' : 'type-item'}>申请中</div>
        <div onClick={dataChange.bind(this, 'status', 2)} className={status == 2 ? 'type-item type_active' : 'type-item'}>已完成</div>
      </div>
    )

    const changeDate = (moment, time) => {
      dateChange(time[0], time[1])
    }

    return (
      <div>
        <TopTabGroup />
        { mask ?
          <Mask {...this.props} /> : ''
        }
        { list ?
          <div>
            <Top data={account} />
            <div className='page-con'>
              <div className='table-top clearfix'>
                {TypeTab}
                <div className='date'>
                  <RangePicker style={{ width: 246 }} onChange={changeDate} />
                </div>
                <div className='btn-right'>
                  <Button type='primary' className='btn orange mr12' onClick={showMask}>申请提现</Button>
                  <Link to='/reward/record'>
                    <Button type='primary' className='btn blue'>消费记录</Button>
                  </Link>
                </div>
              </div>
              <Table loading={fetching} columns={columns} dataSource={list} pagination={pagination}/>
            </div>
          </div> :
          <Spin />
        }
      </div>
    )
  }
}

const Top = ({data}) => (
  <div className='money-con clearfix'>
    <div className='money-item money-left'>
      <span>帐号余额(元)</span>
      <em>{data.balance}</em>
    </div>
    <div className='money-right'>
      <div className='money-item'>
        <span>申请中的金额(元)</span>
        <em>{data.apply_money}</em>
      </div>
      <div className='money-item'>
        <span>已提现金额(元)</span>
        <em>{data.paid_money}</em>
      </div>
      <div className='money-item'>
        <span>已消费金额(元)</span>
        <em>{data.has_consumption}</em>
      </div>
    </div>
  </div>
)
