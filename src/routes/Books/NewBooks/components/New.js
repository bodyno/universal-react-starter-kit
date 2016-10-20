import React, {Component} from 'react'
import { BooksTop } from 'components/TopTab'
import { SearchInput, CheckboxList } from 'components/Ant'
import './New.scss'
import 'components/BookList/components/BookList.scss'
import TableMinWidth from 'components/TableMinWidth'
import { Table } from 'antd'
import { Link } from 'react-router'

const columns = [{
  title: '童书名称',
  dataIndex: 'goods_name',
  render: (text, record) => (
    <div>
      <img className="book-image" src={record.img} width="52" height="52" />
      <span className="book-name">{text}</span>
    </div>
  )
}, {
  title: '出版社',
  dataIndex: 'brand_name'
}, {
  title: '适合年龄',
  dataIndex: 'recommend_age'
}, {
  title: '零售价',
  dataIndex: 'shop_price',
  sorter: (a, b) => a.age - b.age
}, {
  title: '当前结算价',
  dataIndex: 'reward_price'
}, {
  title: '已售数量',
  dataIndex: 'total_number',
  sorter: (a, b) => a.age - b.age
}, {
  title: '库存',
  dataIndex: 'goods_number'
}, {
  title: '操作',
  dataIndex: 'row10',
  className: 'column-right',
  render: (text, record) => (
    <div>
      <Link to={`/books/article/${record.goods_id}?new=true`}>相关文章</Link>
      <a className='ml10' href='#'>分享</a>
    </div>
  )
}]

class Books extends Component {

  componentDidMount (){
    this.props.fetchNewBooks()
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
    const { booksNew, changePage, changeSearch } = this.props
    const { items, total_count, isFetching, q } = booksNew

    const pagination = {
      total: total_count,
      current: booksNew.page,
      pageSize: booksNew.per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    return (
      <div>
        <BooksTop />
        <div className="page-con" style={{minWidth: 1100}}>
          <div>
            <div className="books-search">
              <SearchInput placeholder="书名／作者／绘者／ISBN" style={{ width: 350 }} value={q} submitValue={changeSearch.bind(this)} />
            </div>
            <div className="books-top">
              <CheckboxList {...this.props} bookList={this.props.booksNew} />
            </div>
            <div className="books-table">
              <Table loading={isFetching} columns={columns} dataSource={items} pagination={pagination} onChange={this.tableChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TableMinWidth({
  width: 1150
})(Books)
