import React, {Component} from 'react'
import './Over.scss'
import { TopGroup } from 'components/TopTab'

import { SearchInput } from 'components/Ant'

import { Table } from 'antd'

const columns = [{
  title: '童书名称',
  dataIndex: 't1'
}, {
  title: '团购时间',
  dataIndex: 't2'
}, {
  title: '团购价',
  dataIndex: 't3'
}, {
  title: '已售数量',
  dataIndex: 't4'
},  {
  title: '操作',
  dataIndex: 't5'
}];

const data = [
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice"
  },
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice"
  },
  {
    "t1": "Alice",
    "t2": "Alice",
    "t3": "Alice",
    "t4": "Alice",
    "t5": "Alice"
  }
]

const pagination = {
  total: data.length,
  showSizeChanger: true,
  showQuickJumper: true
}

export default class Over extends Component {
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
