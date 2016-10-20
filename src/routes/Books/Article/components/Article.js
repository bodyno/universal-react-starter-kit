import React, {Component} from 'react'
import { Link } from 'react-router'
import './Article.scss'
import { BooksTop } from 'components/TopTab'

import { Breadcrumb, Icon, Table } from 'antd'

export default class Article extends Component {

  componentDidMount () {
    this.props.setId(this.props.params.id)
    this.props.requestData()
  }

  render (){

    const { changePage } = this.props
    const { items, page, per_page, total_count, isFetching } = this.props.article
    const fromNew = this.props.location.query.new

    const columns = [{
      title: '',
      dataIndex: 'cover_thumb',
      className: 'article-width',
      render: (text, record) => (
        <a target='_blank' href={record.url}>
          <img className="book-image" src={text} width="52" height="52" />
          <span></span>
        </a>
      )
    }, {
      title: '',
      dataIndex: 'title',
      render: (text, record) => (
        <a className='article-link' target='_blank' href={record.url}>{text}</a>
      )
    }, {
      title: '',
      dataIndex: 'url',
      className: 'column-right',
      render: (text, record) => <a href={text}>分享</a>
    }]

    const pagination = {
      total: total_count,
      current: page,
      pageSize: per_page,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: changePage,
      onChange: changePage
    }

    return(
      <div className='article'>
        <BooksTop />
        { fromNew ?
          <div className="p-breadcrumb">
            <Link to="/books/new">
              <Icon type="circle-o-left"/> <span className="gray">新书推荐</span>
            </Link> / 相关文章
          </div> :
          <div className="p-breadcrumb">
            <Link to="/books/all">
              <Icon type="circle-o-left"/> <span className="gray">全部图书</span>
            </Link> / 相关文章
          </div>
        }
        <div className='p-con'>
          <Table loading={isFetching} columns={columns} dataSource={items} pagination={pagination}/>
        </div>
      </div>
    )

  }

}
