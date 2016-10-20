import React, {Component} from 'react'
import './Reward.scss'
import { Link } from 'react-router'
import { TopTabGroup } from 'components/TopTab'
import { SearchInput } from 'components/Ant'
import { Table, DatePicker, Spin } from 'antd'
import Mask from 'components/Withdraw'
const RangePicker = DatePicker.RangePicker

const columns = [{
  title: '童书名称',
  dataIndex: 'goods_name',
  render: (text, record) => (
    <div>
      <img className="book-image" src={record.goods_thumb} width="52" height="52" />
      <span className="book-name">{text}</span>
    </div>
  )
}, {
  title: '销售数量',
  dataIndex: 'total_number',
  sorter: true
}, {
  title: '销售金额',
  dataIndex: 'total_sales',
  sorter: (a, b) => a.age - b.age
}, {
  title: '结算金额',
  dataIndex: 'settlement_price'
}, {
  title: '奖励金额',
  dataIndex: 'total_reward',
  sorter: (a, b) => a.age - b.age
}, {
  title: '操作',
  dataIndex: 'goods_thumb',
  render: (text, record) => <Link to="/orders">订单明细</Link>
}];

export default class extends Component {

  componentDidMount () {
    const { list } = this.props.reward
    if (list) return
    this.props.requestData()
    this.props.setAccount()
    this.props.getApply()
  }

  tableChange = (pagination, filters, sorter) => {
    const { sortChange } = this.props
    let orderBy = null
    switch (sorter.order) {
      case 'ascend':
        orderBy = 'ASC'
        break
      case 'descend':
        orderBy = 'DESC'
        break
    }
    sortChange(sorter.columnKey, orderBy)
  }

  render () {

    const { changePage, showMask } = this.props
    const { list, count, incomes, total_count, page, per_page, has_partner, fetching } = this.props.reward
    const { mask } = this.props.withdraw

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
        <TopTabGroup />
        { mask ?
          <Mask {...this.props} /> : ''
        }
        { list ?
          <div>
            <WardTop data={incomes} show={has_partner} showMask={showMask} />
            <div className='page-con'>
              <SearchBar {...this.props} />
              <Collect data={count} type={this.props.location.pathname} />
              <div className='reward-table'>
                <Table loading={fetching} columns={columns} dataSource={list} pagination={pagination} onChange={this.tableChange}/>
              </div>
            </div>
          </div> :
          <Spin />
        }
      </div>
    )
  }
}

const WardTop = ({data, show, showMask}) => (
  <div className='ward-top'>
    <div className='ward-item ward-item-before'>
      已到账收入(元)
      <span>{data.arrived_income}</span>
    </div>
    <div className='ward-item ward-item-after'>
      即将到账收入(元)
      <span>{data.coming_income}</span>
    </div>
    <div className='ward-item ward-item-all'>
      总收入(元)
      <span>
        {data.total_income}
        { show ? <em onClick={showMask}>申请提现</em> : ''}
      </span>
    </div>
  </div>
)

class SearchBar extends Component {
  render () {

    const { dataChange, dateChange } = this.props
    const { latest_day, q } = this.props.reward

    const changeDate = (moment, time) => {
      dateChange(time[0], time[1])
    }

    const searchHandle = (e) => {
      dataChange('q', e)
    }

    return (
      <div>
        <div className='ward-filter clearfix'>
          <div className='type type-margin'>
            <div onClick={dataChange.bind(this, 'latest_day', null)} className={ latest_day == null ? 'type-item type_active' : 'type-item' }>全部</div>
            <div onClick={dataChange.bind(this, 'latest_day', 7)} className={ latest_day == 7 ? 'type-item type_active' : 'type-item' }>最近7天</div>
            <div onClick={dataChange.bind(this, 'latest_day', 30)} className={ latest_day == 30 ? 'type-item type_active' : 'type-item' }>最近30天</div>
          </div>
          <RangePicker style={{ width: 246 }} onChange={changeDate} />
          <div className='fr'>
            <SearchInput submitValue={searchHandle} value={q} placeholder='童书名称' style={{width: 250}}/>
          </div>
        </div>
      </div>
    )
  }
}

const Collect = ({data, type}) => (
  <div className='ward-c'>
    <div className='ward-c-item ward-blue'>销售数量<span>{data.total_sales_num}</span></div>
    <div className='ward-c-item ward-green'>销售金额<span>{data.total_sales}</span></div>
    <div className='ward-c-item ward-red'>结算金额<span>{data.total_settlement_price}</span></div>
    <div className='ward-c-item ward-orange'>奖励金额<span>{data.total_reward}</span></div>
    { type == '/reward/reward' ?
      <a className='ward-export' href='/restapi/store/v1/rewards/excel'>导出Excel</a> :
      <a className='ward-export' href='/restapi/store/v1/commissions/excel'>导出Excel</a>
    }
  </div>
)
