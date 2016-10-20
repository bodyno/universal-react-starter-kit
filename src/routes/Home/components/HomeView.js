import React, {Component} from 'react'
import './HomeView.scss'
import { Link } from 'react-router'
import { Spin } from 'antd'

import guwenImg from '../assets/qrcode_guwen.png'
import shouhouImg from '../assets/qrcode_shouhou.png'
import appImg from '../assets/qrcode_app.png'
import wechatApp from '../assets/qrcode_wechat.png'

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

export default class HomeView extends Component {

  componentDidMount () {
    this.props.requestData()
  }

  render () {

    const { today } = this.props.home
    const { data: {flow, sales} } = this.props.home

    return (
      <div className='home'>
        <div className='home-left'>
          <div className='title-s'>今日实时统计</div>
          { today ?
            <div>
              <Today data={today} />
              <div className='title-s mt36'>流量趋势</div>
              <div className='page-con' id="width-hook">
                { flow ?
                  <Trend data={flow.items} type='flow'>
                    <ChartInfo data={today} type='flow' />
                  </Trend> :
                  <Spin />
                }
              </div>
              <div className='title-s mt36'>交易趋势</div>
              <div className='page-con'>
                { sales ?
                  <Trend data={sales.items} type='sales'>
                    <ChartInfo data={today} type='sales' />
                  </Trend> :
                  <Spin />
                }
              </div>
            </div>
            : <Spin />
          }
        </div>
        <RightInfo />
      </div>
    )
  }
}

const ChartInfo = ({data, type}) => (
  <div className='home-chart-info clearfix'>
    { type == 'flow' ?
      <div className='text'>
        总会员:<span> {data.total_members}</span>人
        <Link to='/family'>详情</Link>
      </div> :
      <div className='text'>
        总收入:<span> {data.total_income}</span>人
        <Link to='/reward/reward'>详情</Link>
      </div>
    }
    <div className='right'>
      图为最近7天数据
      <Link to='/statistic'>更多统计</Link>
    </div>
  </div>
)

const RightInfo = () => (
  <div className='home-right'>
    <div className='home-share'>
      <span className='iconfont icon-iphone'></span>
      <div className='title'>手机客户端</div>
      <div className='sub-title'>随时随地管理童书馆</div>
      <div className='qrcode-hover'>
        <div>
          <img src={appImg} />
        </div>
        <div className='text'>
          手机扫描并下载<br/>
          孩宝U站App
        </div>
      </div>
    </div>
    <div className='home-share'>
      <span className='iconfont icon-weixin'></span>
      <div className='title'>孩宝小镇微信公众号</div>
      <div className='sub-title'>阅读推广服务平台</div>
      <div className='qrcode-hover'>
        <div>
          <img src={wechatApp} />
        </div>
        <div className='text'>
          微信扫描并关注<br/>
          孩宝小镇微信公众号
        </div>
      </div>
    </div>
    <div className='home-more-con'>
      <div className='home-more'>
        <span className='iconfont icon-guwen'></span>
        <div className='title'>童书馆推广顾问</div>
        <div className='sub-title'>为您专业解答推广问题</div>
        <div className='qrcode-hover'>
          <div>
            <img src={guwenImg} />
          </div>
          <div className='text'>
            微信扫描并添加<br/>
            推广顾问为微信好友
          </div>
        </div>
      </div>
      <div className='home-more'>
        <span className='iconfont icon-headsetmic'></span>
        <div className='title'>售后客服</div>
        <div className='sub-title'>处理订单发货以及售后问题</div>
        <div className='qrcode-hover'>
          <div>
            <img src={shouhouImg} />
          </div>
          <div className='text'>
            微信扫描并添加为好友
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Today = ({data}) => (
  <div className='today-con clearfix'>
    <div className='today-item-con'>
      <div className='today-item today-order'>
        <span className='icon anticon anticon-file-text'></span>
        <div className='num'>{data.day_orders}</div>
        <div className='text'>新增订单</div>
      </div>
    </div>
    <div className='today-item-con'>
      <div className='today-item today-user'>
        <span className='icon anticon anticon-user'></span>
        <div className='num'>{data.day_visitors}</div>
        <div className='text'>到馆人数</div>
      </div>
    </div>
    <div className='today-item-con'>
      <div className='today-item today-family'>
        <span className='icon iconfont icon-family'></span>
        <div className='num'>{data.day_members}</div>
        <div className='text'>新增阅读家庭</div>
      </div>
    </div>
    <div className='today-item-con'>
      <div className='today-item today-sale'>
        <span className='icon anticon anticon-pay-circle-o'></span>
        <div className='num'>{data.day_sales}</div>
        <div className='text'>销售额</div>
      </div>
    </div>
    <div className='today-item-con'>
      <div className='today-item today-money'>
        <span className='icon anticon anticon-pay-circle-o'></span>
        <div className='num'>{data.day_incomes}</div>
        <div className='text'>今日收入</div>
      </div>
    </div>
  </div>
)

export class Trend extends Component {
  render () {

    const { data, type } = this.props

    return (
      <div>
        {this.props.children}
        <div className='home-chart-con' style={{ height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              { type == 'flow'? <Line name='订单数' type="linear" dataKey="orders" stroke="#cccccc" /> : ''}
              { type == 'flow'? <Line name='访客数' type="linear" dataKey="visitors" stroke="#00b9fb" /> : ''}
              { type == 'flow'? <Line name='新增阅读家庭' type="linear" dataKey="members" stroke="#00d690" /> : ''}
              { type == 'sales'? <Line name='收入' type="linear" dataKey="commissions" stroke="#fa8f1d" /> : ''}
              { type == 'sales'? <Line name='销售额' type="linear" dataKey="incomes" stroke="#ff596c" /> : ''}
              { type == 'sales'? <Line name='推广伙伴分成' type="linear" dataKey="sales" stroke="#6589e0" /> : ''}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}
