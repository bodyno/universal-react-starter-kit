import React, {Component} from 'react'
import { Link } from 'react-router'
import './Detail.scss'
import { TopGroup } from 'components/TopTab'

import { Breadcrumb, Icon, Table } from 'antd';

export default class Detail extends Component {
  render (){


    const columns = [{
      title: '日期',
      dataIndex: 't1'
    }, {
      title: '订单号',
      dataIndex: 't2'
    }, {
      title: '单价',
      dataIndex: 't3'
    }, {
      title: '数量',
      dataIndex: 't4'
    }, {
      title: '实付款',
      dataIndex: 't5'
    }, {
      title: '奖励',
      dataIndex: 't6'
    }, {
      title: '收件人',
      dataIndex: 't7'
    }, {
      title: '订单状态',
      dataIndex: 't8'
    }, {
      title: '操作',
      dataIndex: 't9'
    }];

    const data = [
      {
        "t1": "2016-06-06",
        "t2": "15615555555555",
        "t3": "1644",
        "t4": "56",
        "t5": "20",
        "t6": "20",
        "t7": "Alice",
        "t8": "待发货",
        "t9": "订单详情"
      },
      {
        "t1": "2016-06-06",
        "t2": "15615555555555",
        "t3": "1644",
        "t4": "56",
        "t5": "20",
        "t6": "20",
        "t7": "Alice",
        "t8": "待发货",
        "t9": "订单详情"
      },
      {
        "t1": "2016-06-06",
        "t2": "15615555555555",
        "t3": "1644",
        "t4": "56",
        "t5": "20",
        "t6": "20",
        "t7": "Alice",
        "t8": "待发货",
        "t9": "订单详情"
      },
      {
        "t1": "2016-06-06",
        "t2": "15615555555555",
        "t3": "1644",
        "t4": "56",
        "t5": "20",
        "t6": "20",
        "t7": "Alice",
        "t8": "待发货",
        "t9": "订单详情"
      },
      {
        "t1": "2016-06-06",
        "t2": "15615555555555",
        "t3": "1644",
        "t4": "56",
        "t5": "20",
        "t6": "20",
        "t7": "Alice",
        "t8": "待发货",
        "t9": "订单详情"
      }
    ]

    const pagination = {
      total: data.length,
      showSizeChanger: true,
      showQuickJumper: true
    }

    return(
      <div>
        <TopGroup {...this.props} />

        <div className="p-breadcrumb">
          <Link to="/group">
          <Icon type="circle-o-left" /> <span className="gray">已申请</span>
          </Link> / 团购订单
        </div>

        <div className='p-con'>
          <div className="order-info">
            <img className="goods-img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1710405152,1210183381&fm=116&gp=0.jpg" />
            <div className="goods-name">美国进口 凯迪克奖作品 Zin! Zin! Zin! A Violin 大家来听音乐会</div>
            <div className="goods-time">
              <span>开团时间：</span>2016-06-01  00:00
              <span>结束时间：</span>2016-06-01  00:00
            </div>
            <a className="goods-excel">导出Excel</a>
          </div>
          <div className="order-total">
            <div className="item">
              <p className="number">55</p>
              <p className="text">订单总数</p>
            </div>
            <div className="item">
              <p className="number">55</p>
              <p className="text">已售数量</p>
            </div>
            <div className="item">
              <p className="number">55</p>
              <p className="text">实付款</p>
            </div>
            <div className="item">
              <p className="number">55</p>
              <p className="text">预计奖励</p>
            </div>
          </div>
          <Table columns={columns} dataSource={data} pagination={pagination} />
        </div>
      </div>
    )

  }

}
