import React, {Component} from 'react'
import { SearchInput, CheckboxList } from 'components/Ant'
import { Table, Checkbox, notification } from 'antd'
import './BookList.scss'
import _ from 'lodash/array'
import { Link } from 'react-router'

export default class extends Component {

  componentWillMount () {
    // 自定义书单-选择图书
    if (this.props.portion) {
      this.props.changePerPage(4)
      this.props.fetchAllBooks()
      return
    }
    if (this.props.bookList.per_page == 4) {
      this.props.changePerPage(10)
      this.props.fetchAllBooks()
    }
  }

  componentDidMount () {
    if (this.props.bookList.items) return
    this.props.fetchAllBooks()
  }

  selectBook (record) {
    const { addSubBook } = this.props
    addSubBook(record)
    notification.success({
      message: '添加成功',
      description: '添加成功，可继续查看或关闭弹窗',
    })
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

  render() {

    const { bookList, changeSearch, changePage, addSubBook, portion} = this.props
    const { isFetching, items } = bookList
    const { domain } = this.props.core.store_info

    let pagination = {
      total: bookList.total_count,
      current: bookList.page,
      pageSize: bookList.per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    let columns = [{
      title: '童书名称',
      dataIndex: 'goods_name',
      render: (text, record) => (
        <a className='book-link' target='_blank' href={`https://${domain}.baobaobooks.net/goods/${record.goods_id}`}>
          <img className="book-image" src={record.img} width="52" height="52" />
          <span className="book-name">{text}</span>
        </a>
      )
    }, {
      title: '作者／绘者',
      dataIndex: 'author_name'
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
      render: (text, record) => <Link to={`/books/article/${record.goods_id}`}>相关文章</Link>
    }]

    if (portion) {
      _.remove(columns, {title: '出版社'})
      _.remove(columns, {title: '下阶段结算价'})
      _.remove(columns, {title: '操作'})
      columns.push({
        title: '操作',
        dataIndex: 'row10',
        className: 'column-right',
        render: (text, record) => <a onClick={this.selectBook.bind(this, record)} href="#">选择</a>
      })
    }

    return (
      <div>
        <div className="books-search">
          <SearchInput placeholder="书名／作者／绘者／ISBN" style={{ width: 350 }} value={bookList.q} submitValue={changeSearch.bind(this)} />
        </div>
        <div className="books-top">
          <CheckboxList {...this.props} />
        </div>
        <div className="books-table">
          <Table loading={isFetching} columns={columns} dataSource={items} pagination={pagination} onChange={this.tableChange} />
        </div>
      </div>
    )
  }
}
