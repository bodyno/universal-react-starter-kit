import React, {Component} from 'react'
import './Apply.scss'
import { TopGroup } from 'components/TopTab'

import { SearchInput } from 'components/Ant'

import { Table } from 'antd'

const columns = [{
  title: '童书名称',
  dataIndex: 't1'
}, {
  title: '团购价',
  dataIndex: 't2'
}, {
  title: '当前结算价',
  dataIndex: 't3'
}, {
  title: '下一阶段结算价',
  dataIndex: 't4'
}, {
  title: '可申请数量',
  dataIndex: 't5'
}, {
  title: '操作',
  dataIndex: 't6'
}];

const data = [
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice",
    "t6": "Alice"
  },
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice",
    "t6": "Alice"
  },
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice",
    "t6": "Alice"
  }
]

const pagination = {
  total: data.length,
  showSizeChanger: true,
  showQuickJumper: true
}

export default class Apply extends Component {
  render (){

    return(
      <div>
        <TopGroup />
        <div className='p-con'>
          <SearchInput placeholder="童书名称" onSearch={value => console.log(value)} style={{ width: 200 ,paddingBottom:'20px' }} />
          <Table columns={columns} dataSource={data} pagination={pagination} />
        </div>
      </div>
    )

  }

}
