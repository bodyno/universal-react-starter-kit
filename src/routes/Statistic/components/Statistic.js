import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import './Statistic.scss'
import { Link } from 'react-router'
import { DatePicker, Spin } from 'antd'
const RangePicker = DatePicker.RangePicker


export default class Statistic extends Component {

  componentDidMount () {
    this.props.requestDate()
  }

  changeFlowData = (type, dates, dateStrings) => {
    const { changeData } = this.props
    changeData({
      begin_time: dateStrings[0],
      end_time: dateStrings[1]
    }, type)
  }

  changeDuringData = (type, value) => {
    const { changeData } = this.props
    changeData({
      latest_day: value
    }, type)
  }

  render () {
    const { total, sales, flow } = this.props.statistic.data
    const flowData = this.props.statistic.flow
    const salesData = this.props.statistic.sales

    return (
      <div>
        <div className='s-title'>数据统计</div>
        <Group data={total} />
        <div className='title-s'>流量趋势</div>
        { flow ?
          <Trend data={flow.items} type='flow' changeData={this.changeFlowData} changeDay={this.changeDuringData} condition={flowData}>
            <FooterFirst data={flow} />
          </Trend> :
          <Spin />
        }
        <div className='title-s'>交易趋势</div>
        { sales ?
          <Trend data={sales.items} type='sales' changeData={this.changeFlowData} changeDay={this.changeDuringData} condition={salesData}>
            <FooterSecond data={sales} />
          </Trend> :
          <Spin />
        }
      </div>
    )
  }
}

const Group = ({data}) => (
  <div>
    <div className='title-s'>数据概况</div>
    { data ?
      <div className='statistic-con'>
        <Link to='/orders' className='statistic-item'>
          <em>{data.total_orders}</em>
          <span>订单</span>
        </Link>
        <div className='statistic-item not'>
          <em>{data.total_visitors}</em>
          <strong>访客</strong>
        </div>
        <Link to='/family' className='statistic-item'>
          <em>{data.total_members}</em>
          <strong>阅读家庭</strong>
        </Link>
        <Link to='/reward/reward' className='statistic-item'>
          <em>{data.total_incomes}</em>
          <strong>收入(元)</strong>
        </Link>
        <Link to='/reward/reward' className='statistic-item'>
          <em>{data.total_sales}</em>
          <strong>销售额(元)</strong>
        </Link>
        <Link to='/reward/part' className='statistic-item'>
          <em>{data.total_commissions}</em>
          <strong>推广伙伴分成(元)</strong>
        </Link>
      </div> :
      <Spin />
    }
  </div>
)

const FooterFirst = ({data}) => (
  <div>
    <div className='statistic-foot'>最近7天流量概况:</div>
    <div>
      <div className='statistic-foot-item grey-c'>
        <label>订单数</label>
        <span>{data.orders}</span>
      </div>
      <div className='statistic-foot-item blue-c'>
        <label>访客数</label>
        <span>{data.visitors}</span>
      </div>
      <div className='statistic-foot-item green-c'>
        <label>新增阅读家庭</label>
        <span>{data.members}</span>
      </div>
    </div>
  </div>
)

const FooterSecond = ({data}) => (
  <div>
    <div className='statistic-foot'>最近7天交易概况:</div>
    <div>
      <div className='statistic-foot-item orange-c'>
        <label>收入</label>
        <span>{data.incomes}</span>
      </div>
      <div className='statistic-foot-item red-c'>
        <label>销售额</label>
        <span>{data.sales}</span>
      </div>
      <div className='statistic-foot-item purple-c'>
        <label>推广伙伴分成</label>
        <span>{data.commissions}</span>
      </div>
    </div>
  </div>
)

export class Trend extends Component {
  render () {

    const {children, data, changeData, changeDay, condition, type} = this.props

    return (
      <div>
        <div className='trend-con'>
          <div className='trend-top' id='trend-top'>
            <div className={ condition.latest_day == 7 ? 'trend-option active' : 'trend-option' } onClick={changeDay.bind(this, type, 7)}>最近7天</div>
            <div className={ condition.latest_day == 30 ? 'trend-option active' : 'trend-option' } onClick={changeDay.bind(this, type, 30)}>最近30天</div>
            <RangePicker style={{ width: 246 }} format="YYYY-MM-DD" onChange={changeData.bind(this, type)} />
          </div>
          <div className="chart-con">
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                { type == 'flow'? <Line name='订单数' type="linear" dataKey="orders"  stroke="#cccccc" /> : ''}
                { type == 'flow'? <Line name='访客数' type="linear" dataKey="visitors" stroke="#00b9fb" /> : ''}
                { type == 'flow'? <Line name='新增阅读家庭' type="linear" dataKey="members" stroke="#00d690" /> : ''}
                { type == 'sales'? <Line name='收入' type="linear" dataKey="commissions" stroke="#fa8f1d" /> : ''}
                { type == 'sales'? <Line name='销售额' type="linear" dataKey="incomes" stroke="#ff596c" /> : ''}
                { type == 'sales'? <Line name='推广伙伴分成' type="linear" dataKey="sales" stroke="#6589e0" /> : ''}
              </LineChart>
            </ResponsiveContainer>
          </div>
          {children}
        </div>
      </div>
    )
  }
}
